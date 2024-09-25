'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
    _id: string;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
}

const Page: React.FC<{ params: { _id: string } }> = ({ params }) => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:8000/blogs/${params._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [params._id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader">Loading...</div>
                {/* You can replace this with a spinner or skeleton loader */}
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!blog) {
        return <div className="text-center py-10">Blog not found.</div>;
    }

    return (
        <div className="mt-20  bg-gray-100 py-10 px-5">
            <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-semibold mb-4 text-[#25527E]">{blog.title}</h1>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover mb-6 rounded" />
                <p className="text-gray-700 text-lg mb-4">{blog.description}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span>By {blog.author}</span>
                    <span className="mx-2">|</span>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <Link href="/blog">
                    <button className="mt-4 px-4 py-2 bg-[#25527E] text-white rounded-md hover:bg-[#1b3d5d]">
                        Back to Blogs
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Page;
