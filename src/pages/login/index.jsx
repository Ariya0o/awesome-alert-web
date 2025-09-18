// src/pages/login.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    // 假设登录成功
    localStorage.setItem("token", "fake-jwt-token");

    // 登录后跳转回之前的页面（或首页）
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>登录页面</h2>
      <button onClick={handleLogin}>点我登录</button>
    </div>
  );
}
