/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { authUtils } from "../utils/auth";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

function FurnitureDetails() {
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const { id } = useParams();

    const fetchDetails = async (id) => {
        try {
            const response = await axios.get(
                `${baseUrl}/api/furniture/furniture-details/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...authUtils.getAuthHeaders(),
                    },
                }
            );
            const data = response.data.data;
            setProduct(data);
            // Set the first image as the default hero image
            if (data.images && data.images.length > 0) {
                setMainImage(data.images[2]); // Picking index 2 based on your JSON example
            }
        } catch (error) {
            console.error(`Error fetching details: ${error}`);
        }
    };

    useEffect(() => {
        if (id) fetchDetails(id);
    }, [id]);

    if (!product) return <div className="flex justify-center p-20 text-gray-500">Loading fine furniture...</div>;

    // Simple math for the discount
    const discountPrice = product.price * (1 - product.discount / 100);

    return (
        <div className="max-w-6xl mx-auto p-6 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT SIDE: IMAGES */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 border">
                        <img
                            src={`${baseUrl}/uploads/${mainImage}`}
                            alt={product.name}
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 flex-shrink-0 rounded-md border-2 overflow-hidden ${mainImage === img ? 'border-blue-600' : 'border-transparent'}`}
                            >
                                <img src={`${baseUrl}/uploads/${img}`} className="w-full h-full object-cover" alt="thumbnail" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: CONTENT */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{product.category}</span>
                        <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-gray-900">${discountPrice.toFixed(2)}</span>
                        {product.discount > 0 && (
                            <>
                                <span className="text-xl text-gray-400 line-through">${product.price}</span>
                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-bold">-{product.discount}%</span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                        <div>
                            <p className="text-sm text-gray-500">Color</p>
                            <p className="font-medium flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: product.color.toLowerCase() }}></span>
                                {product.color}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Size</p>
                            <p className="font-medium">{product.size}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                {product.inStock ? `● In Stock (${product.quantity} units)` : '● Out of Stock'}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FurnitureDetails;