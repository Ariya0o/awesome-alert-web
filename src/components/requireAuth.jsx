// src/components/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token"); // 判断登录
  const location = useLocation();

  if (!token) {
    // 未登录，跳转到登录页，并记录当前路径，方便登录后跳回来
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
