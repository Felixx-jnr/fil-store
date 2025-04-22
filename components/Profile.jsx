"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkSession } from "@/store/features/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <div>
      <h2>{isAuthenticated ? `Welcome, ${user.email}` : "Please login"}</h2>
    </div>
  );
}
