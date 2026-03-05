/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { authUtils } from "../../utils/auth";
import { buildApiUrl, toImageUrl } from "../../utils/api";

function ProductsTable({ refreshKey = 0, onStatsChange }) {
  const [furnitures, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllFurniture = async () => {
    try {
      setLoading(true);
      const response = await axios.get(buildApiUrl("/api/furniture/all-furniture"));
      setFurniture(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to fetch furniture.";
      toast.error(message);
      setFurniture([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFurniture();
  }, [refreshKey]);

  const stats = useMemo(() => {
    const outOfStock = furnitures.filter((item) => !item.inStock).length;
    return {
      total: furnitures.length,
      outOfStock,
    };
  }, [furnitures]);

  useEffect(() => {
    if (onStatsChange) {
      onStatsChange(stats);
    }
  }, [stats, onStatsChange]);

  const deleteFurniture = async (id) => {
    const confirmed = window.confirm("Delete this furniture item?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(buildApiUrl(`/api/furniture/delete-furniture/${id}`), {
        headers: {
          ...authUtils.getAuthHeaders(),
        },
      });
      toast.success(res.data?.message || "Furniture deleted.");
      fetchAllFurniture();
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete furniture.";
      toast.error(message);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading products...</div>;
  }

  if (furnitures.length === 0) {
    return <div className="p-6 text-sm text-gray-500">No furniture found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 font-medium text-gray-600">S/N</th>
            <th className="p-4 font-medium text-gray-600">Product</th>
            <th className="p-4 font-medium text-gray-600">Category</th>
            <th className="p-4 font-medium text-gray-600">Price</th>
            <th className="p-4 font-medium text-gray-600">Stock</th>
            <th className="p-4 font-medium text-gray-600">Status</th>
            <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {furnitures.map((furniture, index) => (
            <tr key={furniture._id} className="hover:bg-gray-50 transition">
              <td className="p-4 text-sm text-gray-600">{index + 1}</td>
              <td className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={toImageUrl(furniture.images?.[0]) || "https://via.placeholder.com/120x120?text=No+Image"}
                    alt={furniture.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{furniture.name}</div>
                  <div className="text-xs text-gray-400">ID: {furniture._id}</div>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-600">{furniture.category}</td>
              <td className="p-4 text-sm font-semibold">${Number(furniture.price || 0).toFixed(2)}</td>
              <td className="p-4 text-sm text-gray-600">{furniture.quantity || 0} pcs</td>
              <td className="p-4">
                {furniture.inStock ? (
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium bg-red-700 text-white rounded-full">
                    Out of Stock
                  </span>
                )}
              </td>
              <td className="p-4 text-right">
                <NavLink to={`/admin/furniture/${furniture._id}`}>
                  <button className="text-blue-600 hover:underline mr-3" type="button">
                    View Details
                  </button>
                </NavLink>
                <button
                  onClick={() => deleteFurniture(furniture._id)}
                  className="text-red-500 hover:underline"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
