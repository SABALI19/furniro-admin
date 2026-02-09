import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authUtils } from "../../utils/auth.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

function CreateFurnitureModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    color: "",
    size: "",
    quantity: "",
    discount: "",
    description: "",
    inStock: true,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Check authorization on mount
  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      toast.error("Please login to continue");
      onClose();
      return;
    }

    if (!authUtils.hasRole("admin")) {
      toast.error("Only administrators can add furniture");
      onClose();
    }
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return false;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Final role check (defense in depth)
    if (!authUtils.hasRole("admin")) {
      toast.error("You do not have permission to perform this action");
      return;
    }

    setLoading(true);

    try {
      // Prepare FormData
      const payload = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      // Append images
      images.forEach((file) => {
        payload.append("images", file);
      });

      // Make API call with auth headers
      const response = await axios.post(
        `${baseUrl}/api/furniture/create-furniture`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...authUtils.getAuthHeaders(),
          },
        }
      );

      toast.success(response.data.message || "Furniture added successfully!");

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response.data);
      }

      onClose();

    } catch (error) {
      console.error("Create furniture error:", error);

      const statusCode = error?.response?.status;
      const backendMessage = error?.response?.data?.message;

      if (statusCode === 401) {
        toast.error("Session expired. Please login again");
        authUtils.clearAuthData();
        // Optionally redirect to login
      } else if (statusCode === 403) {
        toast.error("You don't have permission to perform this action");
      } else if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("Failed to create furniture. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Add New Furniture Item
            </h3>
            <p className="text-sm text-gray-500">
              Fill in the details to list a new product
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                name="name"
                placeholder="e.g., Modern Oak Coffee Table"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.name}
                required
                disabled={loading}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.category}
                required
                disabled={loading}
              >
                <option value="">Select category</option>
                <option value="Living Room">Living Room</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Office">Office</option>
                <option value="Dining">Dining</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.price}
                required
                disabled={loading}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                min="0"
                placeholder="Available quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.quantity}
                disabled={loading}
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                name="discount"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.discount}
                disabled={loading}
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                name="color"
                placeholder="e.g., Walnut Brown"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.color}
                disabled={loading}
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <input
                name="size"
                placeholder="e.g., 120cm x 60cm x 45cm"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.size}
                disabled={loading}
              />
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images *
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
                disabled={loading}
              />

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the furniture item, materials, features..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows="4"
                onChange={handleChange}
                value={formData.description}
                disabled={loading}
              />
            </div>

            {/* In Stock Checkbox */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Available in stock
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Publishing...
                </span>
              ) : (
                "Publish Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFurnitureModal;