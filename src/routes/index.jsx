import { Navigate } from "react-router-dom";
import RequireAuth from "../components/requireAuth"; 
import MainLayout from "../layouts";
import Error from "../utils/error";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import About from "../pages/about";
import AlertRule from "../pages/alert/alertRule";
import AlertTemplate from "../pages/alert/alertTemplate";
import DataSource from "../pages/dataSource";
import FaultCenter from "../pages/fault/faultCenter";
import User from "../pages/system/user";
import Role from "../pages/system/role";

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout /> 
      </RequireAuth>
    ),// 公共布局
    children: [
      { path: "*", element: <Error /> }, // 未匹配的路径显示 Error 页面
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/about", element: <About /> },
      { path: "/alertRule", element: <AlertRule /> },
      { path: "/alertTemplate", element: <AlertTemplate /> },
      { path: "/dataSource", element: <DataSource /> },
      { path: "/faultCenter", element: <FaultCenter /> },
      { path: "/user", element: <User /> },
      { path: "/role", element: <Role /> },
    ],
  },
];

export default routes;
