import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

export default function UpdatePasswordModal({ isOpen, onClose }) {
  const { updatePassword, token } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(
        { oldPassword: currentPassword, newPassword },
        token
      );
      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Update Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              className="input-field w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="input-field w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              className="input-field w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-2">
              {success}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
