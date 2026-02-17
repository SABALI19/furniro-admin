/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authUtils } from "../../utils/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

function ProductsTable() {
    const [furnitures, setFurniture] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState(null);
    const [error, setError] = useState(null);

    // ===============================
    // FETCH ALL FURNITURE
    // ===============================
    const fetchAllFurniture = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(
                `${baseUrl}/api/furniture/all-furniture`
            );

            setFurniture(response.data?.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load furniture.");
            toast.error("Failed to load furniture");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllFurniture();
    }, []);

    // ===============================
    // DELETE FURNITURE
    // ===============================
    const deleteFurniture = async (id) => {
        if (!window.confirm("Are you sure you want to delete this furniture?"))
            return;

        try {
            setDeleteLoadingId(id);

            const res = await axios.delete(
                `${baseUrl}/api/furniture/delete-furniture/${id}`,
                {
                    headers: {
                        ...authUtils.getAuthHeaders(),
                    },
                }
            );

            toast.success(res.data?.message || "Furniture deleted successfully");

            // Reload furniture after delete
            await fetchAllFurniture();
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to delete furniture"
            );
        } finally {
            setDeleteLoadingId(null);
        }
    };

    // ===============================
    // UI STATES
    // ===============================

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600">
                Loading furniture...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                {error}
            </div>
        );
    }

    if (!loading && furnitures.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                No furniture found.
            </div>
        );
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
                        <th className="p-4 font-medium text-gray-600 text-right">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {furnitures.map((furniture, index) => (
                        <tr
                            key={furniture._id}
                            className="hover:bg-gray-50 transition"
                        >
                            <td className="p-4 text-sm text-gray-600">
                                {index + 1}
                            </td>

                            <td className="p-4 flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                                    <img
                                        src={furniture.images?.[0] || "/placeholder.png"}
                                        alt={furniture.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {furniture.name}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        ID: #{furniture._id?.slice(-5)}
                                    </div>
                                </div>
                            </td>

                            <td className="p-4 text-sm text-gray-600">
                                {furniture.category}
                            </td>

                            <td className="p-4 text-sm font-semibold">
                                ${furniture.price}
                            </td>

                            <td className="p-4 text-sm text-gray-600">
                                {furniture.quantity} pcs
                            </td>

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
                                <button className="text-blue-600 hover:underline mr-3">
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteFurniture(furniture._id)}
                                    disabled={deleteLoadingId === furniture._id}
                                    className="text-red-500 hover:underline disabled:opacity-50"
                                >
                                    {deleteLoadingId === furniture._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsTable
