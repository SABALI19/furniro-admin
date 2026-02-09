import React, { useState } from "react";
import ProductsTable from "../components/common/ProductsTable";
import CreateFurnitureModal from "../components/Modals/CreateFurnitureModal";
function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div class="min-h-screen bg-gray-50 flex">
      <aside class="w-64 bg-white border-r hidden md:block">
        <div class="p-6">
          <h1 class="text-xl font-bold text-gray-800">LuxeFurn Admin</h1>
        </div>
        <nav class="mt-6 space-y-1 px-4">
          <a
            href="#"
            class="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg"
          >
            <span class="mr-3">📦</span> Inventory
          </a>
          <a
            href="#"
            class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <span class="mr-3">🛒</span> Orders
          </a>
          <a
            href="#"
            class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <span class="mr-3">👥</span> Users
          </a>
        </nav>
      </aside>

      <main class="flex-1 overflow-y-auto">
        <header class="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 class="text-lg font-semibold text-gray-700">
            Furniture Management
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Furniture
          </button>

        </header>

        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl border shadow-sm">
              <p class="text-sm text-gray-500">Total Products</p>
              <p class="text-2xl font-bold">1,284</p>
            </div>
            <div class="bg-white p-6 rounded-xl border shadow-sm">
              <p class="text-sm text-gray-500">Active Orders</p>
              <p class="text-2xl font-bold text-orange-600">45</p>
            </div>
            <div class="bg-white p-6 rounded-xl border shadow-sm">
              <p class="text-sm text-gray-500">Out of Stock</p>
              <p class="text-2xl font-bold text-red-600">12</p>
            </div>
          </div>

          <section class="bg-white rounded-xl border shadow-sm overflow-hidden">
            <ProductsTable />
          </section>
          {showModal && (
            <CreateFurnitureModal onClose={() => setShowModal(false)} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
