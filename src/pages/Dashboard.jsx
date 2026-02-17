import React, { useState } from "react";
import Layout from "../components/common/Layout";
// import ProductsTable from "../components/common/ProductsTable";
import CreateFurnitureModal from "../components/Modals/CreateFurnitureModal";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const actionButton = (
    <button
      onClick={() => setShowModal(true)}
      className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
      + Add Furniture
    </button>
  );

  return (
    <Layout title="Furniture Management" action={actionButton}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">1,284</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Active Orders</p>
          <p className="text-2xl font-bold text-orange-600">45</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">12</p>
        </div>
      </div>

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ProductsTable />
      </section>
      {showModal && (
        <CreateFurnitureModal onClose={() => setShowModal(false)} />
      )}
    </Layout>
  );
}

export default Dashboard;
