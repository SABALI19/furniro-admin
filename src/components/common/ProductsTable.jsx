import React from 'react'

function ProductsTable() {
    return (
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b">
                    <tr>
                        <th class="p-4 font-medium text-gray-600">Product</th>
                        <th class="p-4 font-medium text-gray-600">Category</th>
                        <th class="p-4 font-medium text-gray-600">Price</th>
                        <th class="p-4 font-medium text-gray-600">Stock</th>
                        <th class="p-4 font-medium text-gray-600">Status</th>
                        <th class="p-4 font-medium text-gray-600 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    <tr class="hover:bg-gray-50 transition">
                        <td class="p-4 flex items-center gap-3">
                            <div class="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                                <img src="/api/placeholder/100/100" alt="Sofa" class="object-cover w-full h-full" />
                            </div>
                            <div>
                                <div class="font-medium text-gray-900">Velvet Armchair</div>
                                <div class="text-xs text-gray-400">ID: #48291</div>
                            </div>
                        </td>
                        <td class="p-4 text-sm text-gray-600">Living Room</td>
                        <td class="p-4 text-sm font-semibold">$599.00</td>
                        <td class="p-4 text-sm text-gray-600">24 pcs</td>
                        <td class="p-4">
                            <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">In Stock</span>
                        </td>
                        <td class="p-4 text-right">
                            <button class="text-blue-600 hover:underline mr-3">Edit</button>
                            <button class="text-red-500 hover:underline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductsTable