'use client'
import React, { useState, useEffect } from 'react';

interface Blog {
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
}

const BlogPage: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch blogs from the localhost API
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:8000/blogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            {/* Recent Blog Posts */}
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg overflow-hidden"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#25527E] mb-2">{blog.title}</h3>
                                <p className="text-gray-700 mb-4">{blog.description}</p>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <span>By {blog.author}</span>
                                    <span className="mx-2">|</span>
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
