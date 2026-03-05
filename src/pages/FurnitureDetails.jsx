import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import { buildApiUrl, toImageUrl } from "../utils/api";

function FurnitureDetails() {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(buildApiUrl(`/api/furniture/furniture-details/${id}`));
        setFurniture(response.data?.data || null);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch furniture details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <Layout title="Furniture Details">
      {loading && <div className="text-sm text-gray-500">Loading details...</div>}

      {!loading && error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && !error && furniture && (
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={toImageUrl(furniture.images?.[0]) || "https://via.placeholder.com/400x400?text=No+Image"}
                alt={furniture.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">{furniture.name}</h2>
              <p className="text-gray-600">{furniture.description || "No description."}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-semibold">Category:</span> {furniture.category || "-"}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${Number(furniture.price || 0).toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span> {furniture.quantity || 0}
                </p>
                <p>
                  <span className="font-semibold">In Stock:</span> {furniture.inStock ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold">Color:</span> {furniture.color || "-"}
                </p>
                <p>
                  <span className="font-semibold">Size:</span> {furniture.size || "-"}
                </p>
                <p>
                  <span className="font-semibold">Discount:</span> {furniture.discount || 0}%
                </p>
                <p>
                  <span className="font-semibold">ID:</span> {furniture._id}
                </p>
              </div>
            </div>
          </div>

          {Array.isArray(furniture.images) && furniture.images.length > 1 && (
            <div>
              <h3 className="font-semibold mb-2">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {furniture.images.map((img, index) => (
                  <div key={`${img}-${index}`} className="h-28 bg-gray-100 rounded-md overflow-hidden">
                    <img src={toImageUrl(img)} alt={`${furniture.name}-${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link to="/admin/furniture" className="inline-block text-indigo-600 hover:underline">
            Back to furniture list
          </Link>
        </div>
      )}
    </Layout>
  );
}

export default FurnitureDetails;
