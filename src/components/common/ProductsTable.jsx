/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authUtils } from "../../utils/auth";
import { NavLink } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

function ProductsTable() {
  const [furnitures, setFurniture] = useState([]);

  const fetchAllFurniture = async () => {
    const response = await axios.get(`${baseUrl}/api/furniture/all-furniture`);
    const data = await response.data.data;
    setFurniture(() => {
      return data;
    });
  };
  useEffect(() => {
    fetchAllFurniture();
  }, []);
  //delete furniture
  const deleteFurniture = async (id) => {
    const res = await axios.delete(
      `${baseUrl}/api/furniture/delete-furniture/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...authUtils.getAuthHeaders(),
        },
      },
    );
    (res.data, toast.success(res.data.message));
    fetchAllFurniture()
  };

  return (
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="p-4 font-medium text-gray-600">S/N</th>
            <th class="p-4 font-medium text-gray-600">Product</th>
            <th class="p-4 font-medium text-gray-600">Category</th>
            <th class="p-4 font-medium text-gray-600">Price</th>
            <th class="p-4 font-medium text-gray-600">Stock</th>
            <th class="p-4 font-medium text-gray-600">Status</th>
            <th class="p-4 font-medium text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        {furnitures.map((furniture, index) => {
          return (
            <tbody class="divide-y">
              <tr key={furniture.id} class="hover:bg-gray-50 transition">
                <td class="p-4 text-sm text-gray-600">{index + 1}</td>
                <td class="p-4 flex items-center gap-3">
                  <div class="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                    <img
                      src={furniture.images[0]}
                      alt={furniture.name}
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">
                      {furniture.name}
                    </div>
                    <div class="text-xs text-gray-400">ID: #48291</div>
                  </div>
                </td>
                <td class="p-4 text-sm text-gray-600">{furniture.category}</td>
                <td class="p-4 text-sm font-semibold">${furniture.price}</td>
                <td class="p-4 text-sm text-gray-600">
                  {furniture.quantity} pcs
                </td>
                <td class="p-4">
                  {furniture.inStock === true ? (
                    <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span class="px-2 py-1 text-xs font-medium bg-red-700 text-white rounded-full">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td class="p-4 text-right">
                   <NavLink to={`/view-details/${furniture._id}`}>
                    <button class="text-blue-600 hover:underline mr-3">View Details</button>
                   </NavLink>
                  <button class="text-blue-600 hover:underline mr-3">
                    Edit
                  </button>
                  <button
                    onClick={() =>deleteFurniture(furniture._id)}
                    class="text-red-500 hover:underline"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default ProductsTable
