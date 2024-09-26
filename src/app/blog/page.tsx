'use client'
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const blogsPerPage = 6;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://way-go-server.vercel.app/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">Recent Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#25527E] mb-2">
                  {blog.title.length > 30 ? `${blog.title.substring(0, 25)}...` : blog.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {blog.description.length > 30
                    ? `${blog.description.substring(0, 30)}...`
                    : blog.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>By {blog.author}</span>
                  <span className="mx-2">|</span>
                  <span>{blog.date}</span>
                </div>
                <div className="mt-5">
                  <Link href={`/blog/${blog._id}`}>
                    <button className="md:inline-flex items-center justify-center px-5 py-2 font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-md hover:bg-[#d05424]">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 text-white bg-gray-600 rounded ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 text-white rounded ${
                currentPage === index + 1 ? 'bg-[#f0652b]' : 'bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 text-white bg-gray-600 rounded ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
