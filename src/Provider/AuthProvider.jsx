"use client";

import { createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const saveUserToMongoDB = async (user) => {
        const currentUser = {
            email: user.email,
            name: user.displayName || '',
            photo: user.photoURL || '',
            role: 'user',
        };

        try {
            const existingUserResponse = await axios.get(`https://way-go-server.vercel.app/users/${user.email}`);
            const existingUser = existingUserResponse.data;

            if (existingUser) {
                return existingUser;
            }

            const { data } = await axios.put('https://way-go-server.vercel.app/user', currentUser);
            return data;
        } catch (error) {
            console.error("Error saving user to MongoDB:", error);
            throw error;
        }
    };

    const createUser = async (email, password, name) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            await saveUserToMongoDB(userCredential.user);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await saveUserToMongoDB(userCredential.user);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            await saveUserToMongoDB(userCredential.user);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            localStorage.removeItem('access-token');
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name, photo) => {
        if (!auth.currentUser) return;
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            });

            await saveUserToMongoDB(auth.currentUser);
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        saveUser: saveUserToMongoDB,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
