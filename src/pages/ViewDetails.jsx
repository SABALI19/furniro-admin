import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

function ProductDetails() {
  const { id } = useParams();

  const [furniture, setFurniture] = useState(null);

 useEffect(() => {
  const fetchFurniture = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/furniture/furniture-details/${id}`
      );

      setFurniture(response.data.data); // ✅ direct set
    } catch (error) {
      console.error(error);
    }
  };

  fetchFurniture();
  }, [id]);


  if (!furniture) {
  return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images Section */}
        <div>
          <img
            src={furniture.images?.[0]} // ✅ use first image
            alt={furniture.name}
            className="w-full h-96 object-cover rounded-lg mb-4"
          />

          <div className="flex gap-3">
            {furniture.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{furniture.name}</h1>

          <p className="text-gray-500 mb-4">{furniture.category}</p>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-semibold text-black">
              ${furniture.price}
            </span>

            {furniture.discount > 0 && (
              <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                {furniture.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{furniture.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <span className="font-medium">Size:</span> {furniture.size}
            </div>

            <div>
              <span className="font-medium">Color:</span> {furniture.color}
            </div>

            <div>
              <span className="font-medium">Quantity:</span>{" "}
              {furniture.quantity}
            </div>

            <div>
              <span className="font-medium">Stock Status:</span>{" "}
              {furniture.inStock ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <span className="font-medium">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {furniture.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
