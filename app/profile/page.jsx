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
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const [countryList, setCountryList] = useState([]);

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

  const fieldLabels = {
    username: "Username",
    phone: "Phone Number",
    address: "Delivery Address",
    dob: "Date of Birth",
    country: "Country",
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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Unexpected data format:", data);
          return;
        }

        const sortedCountries = data
          .map((c) => ({
            name: c.name?.common || "Unknown",
            code: c.cca2 || "",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountryList(sortedCountries);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) {
      alert("Please enter a valid phone number (7–15 digits).");
      return;
    }

    await dispatch(updateUser(formData));
    dispatch(fetchUser());
    setIsEditing(false);
    router.push("/products");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen form-background">
        <Loading />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center mt-[50px] p-10 form-background">
      <div className="bg-white shadow-2xl p-5 rounded-2xl w-[95%] xs:w-[80%] md:w-[600px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          PROFILE PAGE
        </h1>
        <div className="font-semibold text-gren text-xs xs:text-lg text-center">
          {user?.email}
        </div>
        <p className="text-gren text-xs xs:text-sm text-center">
          Fill in your details, to get a customize experience
        </p>

        {Object.entries(formData).map(([key, value]) => (
          <div
            key={key}
            className="my-4"
          >
            <label className="font-semibold capitalize">
              {fieldLabels[key]}
            </label>
            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <span>{fieldIcons[key]}</span>

              {key === "country" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="block bg-white outline-0 w-full text-sm"
                >
                  <option value="">Select a country</option>
                  {countryList.map((country) => (
                    <option
                      key={country.code}
                      value={country.name}
                    >
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    key === "dob" ? "date" : key === "phone" ? "tel" : "text"
                  }
                  name={key}
                  value={value}
                  onChange={(e) => {
                    // Only allow numbers for phone field
                    if (key === "phone") {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, phone: onlyNums }));
                    } else {
                      handleChange(e);
                    }
                  }}
                  disabled={!isEditing}
                  placeholder={fieldLabels[key]}
                  className="block outline-0 w-full placeholder-filgrey"
                />
              )}
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
