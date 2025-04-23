"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    dob: "",
    country: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        phone: user.phone || "",
        address: user.address || "",
        dob: user.dob || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await dispatch(updateUser(formData));
    dispatch(fetchUser());
    setIsEditing(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto p-4 max-w-xl">
      <h1 className="mb-4 font-bold text-2xl">Profile Page</h1>
      {Object.entries(formData).map(([key, value]) => (
        <div
          className="mb-4"
          key={key}
        >
          <label className="block font-medium capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            disabled={!isEditing}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      ))}
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Edit Profile
        </button>
      ) : (
        <button
          onClick={handleSave}
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}
