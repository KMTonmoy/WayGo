'use client';
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

const EditBanner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedData, setEditedData] = useState({
        heading: '',
        description: '',
        url: ''
    });

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await fetch('https://way-go-server.vercel.app/banners');
                if (!response.ok) throw new Error('Failed to fetch banner data');
                const data = await response.json();
                setImages(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBannerData();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://way-go-server.vercel.app/banners/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Failed to delete the banner');
                setImages(prevImages => prevImages.filter(image => image._id !== id));
                Swal.fire('Deleted!', 'Your banner has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        }
    };

    const handleEdit = () => {
        const currentImage = images[currentImageIndex];
        if (currentImage) {
            setEditedData({
                heading: currentImage.heading,
                description: currentImage.description,
                url: currentImage.url,
            });
            setIsModalOpen(true);
        }
    };

    const handleSave = async () => {
        const currentImage = images[currentImageIndex];
        if (!currentImage) return;

        const { _id } = currentImage;
        try {
            const response = await fetch(`https://way-go-server.vercel.app/banners/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });
            if (!response.ok) throw new Error('Failed to update the banner');
            setImages(prevImages =>
                prevImages.map(image =>
                    image._id === _id ? { ...image, ...editedData } : image
                )
            );
            setIsModalOpen(false);
            Swal.fire('Updated!', 'Your banner has been updated.', 'success');
        } catch (error) {
            Swal.fire('Error!', error.message, 'error');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center">Error: {error}</div>;

    return (
        <div className="relative z-0">
            {images.length === 0 ? (
                <div className="text-center">No banners available. Please add a banner.</div>
            ) : (
                <div className="relative h-[800px] lg:h-[800px] transition-all duration-700 ease-in-out">
                    <img src={images[currentImageIndex].url} alt={images[currentImageIndex].heading} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="container mx-auto grid lg:grid-cols-2 gap-5 items-center px-5 lg:px-10">
                            <div className="text-white text-center lg:text-left">
                                <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                                    {images[currentImageIndex].heading}
                                </h1>
                                <p className="mb-6 text-sm lg:text-base">
                                    {images[currentImageIndex].description}
                                </p>
                                <div className="flex space-x-2 justify-center lg:justify-start">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleEdit}>Edit</button>
                                    <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleDelete(images[currentImageIndex]._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="absolute bottom-4 left-4 flex space-x-2">
                <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}>Previous</button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))}>Next</button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Edit Banner</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Heading</label>
                                <input
                                    type="text"
                                    value={editedData.heading}
                                    onChange={(e) => setEditedData({ ...editedData, heading: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Description</label>
                                <textarea
                                    value={editedData.description}
                                    onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Image URL</label>
                                <input
                                    type="text"
                                    value={editedData.url}
                                    onChange={(e) => setEditedData({ ...editedData, url: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                        <div className="flex justify-between mt-4">
                            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditBanner;
