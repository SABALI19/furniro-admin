import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/common/Layout";
import { authUtils } from "../utils/auth";
import { buildApiUrl } from "../utils/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(buildApiUrl("/api/user/users"), {
        headers: {
          ...authUtils.getAuthHeaders(),
        },
      });
      setUsers(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmed = window.confirm("Delete this user?");
    if (!confirmed) return;

    try {
      await axios.delete(buildApiUrl(`/api/user/delete-user/${id}`), {
        headers: {
          ...authUtils.getAuthHeaders(),
        },
      });
      toast.success("User deleted.");
      fetchUsers();
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to delete user.";
      toast.error(message);
    }
  };

  return (
    <Layout title="Users">
      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {loading && <div className="p-6 text-sm text-gray-500">Loading users...</div>}
        {!loading && error && <div className="p-6 text-sm text-red-600">{error}</div>}
        {!loading && !error && users.length === 0 && (
          <div className="p-6 text-sm text-gray-500">No users found.</div>
        )}
        {!loading && !error && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-gray-600">Name</th>
                  <th className="p-4 font-medium text-gray-600">Email</th>
                  <th className="p-4 font-medium text-gray-600">Role</th>
                  <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user._id || user.email} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-700">{user.name || "-"}</td>
                    <td className="p-4 text-sm text-gray-700">{user.email || "-"}</td>
                    <td className="p-4 text-sm text-gray-700">{user.role || "-"}</td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        className="text-red-500 hover:underline"
                        onClick={() => deleteUser(user._id)}
                        disabled={!user._id}
                      >
                        Delete
                      </button>
                    </td>
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

export default Users;
