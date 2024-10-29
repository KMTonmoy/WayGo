'use client';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { imageUpload } from '../../../api/utils/index';

const Page = () => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!img) {
      toast.error('Please upload an image for the coupon.');
      return;
    }

    try {
      const imageUrl = await imageUpload(img);
      const coupon = {
        title,
        img: imageUrl,
        discountPercentage: parseInt(discountPercentage, 10),
        promoCode,
      };

      const response = await fetch(
        'https://way-go-backend.vercel.app/coupons',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(coupon),
        }
      );

      const result = await response.json();
      if (result.acknowledged) {
        toast.success('Coupon added successfully!');
        setTitle('');
        setImg(null);
        setDiscountPercentage('');
        setPromoCode('');
      } else {
        toast.error('Failed to add coupon.');
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
      toast.error('An error occurred while adding the coupon.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">Add Coupon</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-lg p-5 shadow-lg max-w-md w-full"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full"
            maxLength={15}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="img">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-400 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="discountPercentage"
          >
            Discount Percentage
          </label>
          <input
            id="discountPercentage"
            type="number"
            value={discountPercentage}
            onChange={e => setDiscountPercentage(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="promoCode">
            Promo Code
          </label>
          <input
            id="promoCode"
            type="text"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#F43F5E]   text-white font-bold py-2 px-4 rounded"
        >
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default Page;
