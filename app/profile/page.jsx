"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "@/store/features/authSlice";
import { GoPerson } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";
import Loading from "@/components/Loading";

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

  const fieldIcons = {
    username: <GoPerson className="text-gren text-2xl" />,
    phone: <FiPhone className="text-gren text-2xl" />,
    address: <MdOutlineLocationOn className="text-gren text-2xl" />,
    dob: <FaBirthdayCake className="text-gren text-2xl" />,
    country: <GiWorld className="text-gren text-2xl" />,
  };

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen form-background">
        {" "}
        <Loading />{" "}
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center mt-[59px] p-10 form-background">
      <div className="bg-white/75 shadow-2xl p-5 rounded-2xl w-[95%] xs:w-[80%] md:w-[600px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          Profile Page
        </h1>
        {Object.entries(formData).map(([key, value]) => (
          <div
            key={key}
            className="my-4"
          >
            <label className="font-semibold capitalize">{key}</label>
            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <span>{fieldIcons[key]}</span>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!isEditing}
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          {isEditing ? (
            <button
              disabled
              className="bg-green-800 px-2 xs:px-3 py-2 xs:py-3 font-poppins text-light text-xs xs:text-sm"
            >
              Editing...
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="buttons"
            >
              Edit Profile
            </button>
          )}

          {isEditing && (
            <button
              onClick={handleSave}
              className="buttons"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
