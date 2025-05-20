"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/features/authSlice";

const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      router.push("/"); 
    } else {
      console.error("Logout failed:", result.payload);
      
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="buttons"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
