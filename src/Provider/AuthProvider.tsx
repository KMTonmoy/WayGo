"use client";

import { createContext, useEffect, useState, ReactNode, FC } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    User as FirebaseUser
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from 'axios';

interface AuthContextType {
    user: FirebaseUser | null;
    loading: boolean;
    createUser: (email: string, password: string, name: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logOut: () => Promise<void>;
    updateUserProfile: (name: string, photo: string) => Promise<void>;
    saveUser: (user: FirebaseUser) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext<AuthContextType | null>(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);


    const saveUserToMongoDB = async (user: FirebaseUser) => {
        const currentUser = {
            email: user.email,
            name: user.displayName || '',
            photo: user.photoURL || '',
            role: 'user',
        };

        try {
            const existingUserResponse = await axios.get(`http://localhost:8000/users/${user.email}`);
            const existingUser = existingUserResponse.data;

            if (existingUser) {
                return existingUser;
            }


            const { data } = await axios.put('http://localhost:8000/user', currentUser);
            return data;
        } catch (error) {
            console.error("Error saving user to MongoDB:", error);
            throw error;
        }
    };

    const createUser = async (email: string, password: string, name: string) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update user profile with the provided name
            await updateProfile(userCredential.user, { displayName: name });
            // Save user data to MongoDB
            await saveUserToMongoDB(userCredential.user);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
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

    const updateUserProfile = async (name: string, photo: string) => {
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

    const authInfo: AuthContextType = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        saveUser: saveUserToMongoDB
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
