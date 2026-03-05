import React, { useState } from "react";
import Layout from "../components/common/Layout";
import ProductsTable from "../components/common/ProductsTable";
import CreateFurnitureModal from "../components/Modals/CreateFurnitureModal";

function Furniture() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const actionButton = (
    <button
      onClick={() => setShowModal(true)}
      className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
      + Add Furniture
    </button>
  );

  return (
    <Layout title="All Furniture" action={actionButton}>
      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ProductsTable refreshKey={refreshKey} />
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

export default Furniture;
