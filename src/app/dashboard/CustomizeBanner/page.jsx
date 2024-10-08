'use client';
import React, { useState } from 'react';

const Page = () => {
    const [showModal, setShowModal] = useState(false);
    const [bannerImage, setBannerImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setPreview(null);
        setTitle('');
        setDescription('');
    };

    return (
        <div className='w-full py-5 px-10'>
            <div 
                className='w-full border-2 rounded-xl border-orange-600 h-[500px] cursor-pointer'
                onClick={handleModalOpen}  // Opens modal on div click
            >
                <div className='bg-[#ff6e1b5d] rounded-xl h-full flex justify-center items-center text-center'>
                    <div>
                        {preview ? (
                            <img 
                                src={preview} 
                                alt="Banner Preview" 
                                className="w-full h-[450px] object-cover rounded-lg" 
                            />
                        ) : (
                            <div className='flex flex-col items-center'>
                                <p className="text-lg font-semibold">Add Banner</p>
                                <p className="text-6xl font-bold text-orange-600 mt-3">+</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-1/3 rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Upload Banner</h2>

                        {/* Upload Image */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Upload Image</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        {/* Title Input */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Title</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Enter title" 
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        {/* Description Input */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Description</label>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                placeholder="Enter description" 
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                            />
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={handleModalClose} 
                                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    // Add your submit logic here
                                    console.log({
                                        bannerImage,
                                        title,
                                        description,
                                    });
                                    handleModalClose();
                                }} 
                                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
