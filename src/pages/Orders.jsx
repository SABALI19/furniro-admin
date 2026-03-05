import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import { authUtils } from "../utils/auth";
import { buildApiUrl } from "../utils/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(buildApiUrl("/api/orders"), {
          headers: {
            ...authUtils.getAuthHeaders(),
          },
        });
        setOrders(Array.isArray(response.data?.data) ? response.data.data : []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout title="Orders">
      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {loading && <div className="p-6 text-sm text-gray-500">Loading orders...</div>}
        {!loading && error && <div className="p-6 text-sm text-red-600">{error}</div>}
        {!loading && !error && orders.length === 0 && (
          <div className="p-6 text-sm text-gray-500">No orders found.</div>
        )}
        {!loading && !error && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-gray-600">Order ID</th>
                  <th className="p-4 font-medium text-gray-600">Customer</th>
                  <th className="p-4 font-medium text-gray-600">Items</th>
                  <th className="p-4 font-medium text-gray-600">Total</th>
                  <th className="p-4 font-medium text-gray-600">Payment</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-700">{order._id}</td>
                    <td className="p-4 text-sm text-gray-700">{order.user?.name || "Unknown"}</td>
                    <td className="p-4 text-sm text-gray-700">{order.orderItems?.length || 0}</td>
                    <td className="p-4 text-sm text-gray-700">${Number(order.totalPrice || 0).toFixed(2)}</td>
                    <td className="p-4 text-sm text-gray-700">{order.paymentMethod || "-"}</td>
                    <td className="p-4 text-sm text-gray-700">{order.isDelivered ? "Delivered" : "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Orders;
