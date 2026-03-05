import React, { useState } from "react";
import Layout from "../components/common/Layout";
import CreateFurnitureModal from "../components/Modals/CreateFurnitureModal";
import ProductsTable from "../components/common/ProductsTable";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    outOfStock: 0,
  });

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
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold text-green-600">{Math.max(stats.total - stats.outOfStock, 0)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
        </div>
      </div>

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ProductsTable refreshKey={refreshKey} onStatsChange={setStats} />
      </section>
      {showModal && (
        <CreateFurnitureModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setRefreshKey((prev) => prev + 1)}
        />
      )}
    </Layout>
  );
}

export default Dashboard;
