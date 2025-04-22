"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, clearUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(clearUser());
    router.push("/login");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Not authenticated</p>;

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
      <h2>Welcome, {user?.email}</h2>
      <h2>Welcome, {user?.phone}</h2>
      <h2>Welcome, {user?.address}</h2>
      <h2>Welcome, {user?.dob}</h2>
      <h2>Welcome, {user?.country}</h2>
      <h2>Welcome, {user?.role}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
