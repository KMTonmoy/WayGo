"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(
          "https://way-go-backend.vercel.app/coupons"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://way-go-backend.vercel.app/coupons/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setCoupons(coupons.filter((coupon) => coupon._id !== id));
          Swal.fire("Deleted!", "Coupon has been deleted.", "success");
        } else {
          Swal.fire("Failed!", "Failed to delete coupon.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Error deleting coupon.", "error");
      }
    }
  };

  const handleUpdate = (coupon) => {
    setSelectedCoupon(coupon);
    setTitle(coupon.title);
    setPromoCode(coupon.promoCode);
    setDiscountPercentage(coupon.discountPercentage);
    setImg(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    const updatedCoupon = {
      title,
      promoCode,
      discountPercentage: parseInt(discountPercentage, 10),
      img: img ? await imageUpload(img) : selectedCoupon.img,
    };

    try {
      const response = await fetch(
        `https://way-go-backend.vercel.app/coupons/${selectedCoupon._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCoupon),
        }
      );

      if (response.ok) {
        const updatedCoupons = coupons.map((coupon) =>
          coupon._id === selectedCoupon._id
            ? { ...coupon, ...updatedCoupon }
            : coupon
        );
        setCoupons(updatedCoupons);
        setShowModal(false);
        Swal.fire("Updated!", "Coupon updated successfully.", "success");
      } else {
        Swal.fire("Failed!", "Failed to update coupon.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Error updating coupon.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center w-full py-10 justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-center text-[#25527E] mb-6">
          Manage Coupons
        </h1>
        {coupons.length === 0 ? (
          <p className="text-gray-600 text-center">No coupons available.</p>
        ) : (
          <table className="min-w-full bg-white border text-center items-center border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Promo Code</th>
                <th className="py-2 px-4 border-b">Discount</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{coupon.title}</td>
                  <td className="py-2 px-4 border-b">{coupon.promoCode}</td>
                  <td className="py-2 px-4 border-b">
                    {coupon.discountPercentage}%
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={coupon.img}
                      alt={coupon.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleUpdate(coupon)}
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Coupon</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="promoCode"
                >
                  Promo Code
                </label>
                <input
                  id="promoCode"
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
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
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                  required
                />
              </div>

              {/* <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="img">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div> */}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-1 px-3 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Update Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.secure_url;
};

export default ManageCoupon;
