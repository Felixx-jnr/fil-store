"use client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    // Redirect to login page
    router.push("/");
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
