import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { MenuItems } from "./menuItems";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // 控制菜单折叠状态

  // 根据 key 查找对应的 path
  const findPathByKey = (key, items) => {
    for (const item of items) {
      if (item.key === key) {
        return item.path ?? null; // 如果未定义 path，返回默认错误路径
      }
      if (item.children) {
        const childPath = findPathByKey(key, item.children);
        if (childPath) return childPath;
      }
    }
    return null; // 未匹配到任何路径时返回默认错误路径
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ height: "100vh", position: "sticky", top: 0 }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontWeight: "bold",
          }}
        >
          Alert
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(findPathByKey(key, MenuItems))}
          items={MenuItems}
        />
        {/* 添加仅显示图标的菜单项 */}
        <Menu
          theme="dark"
          mode="inline"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Menu.Item
            key="toggle"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)} // 切换折叠状态
          />
        </Menu>
      </Sider>

      <Layout
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Header
          style={{
            height: 64,
            lineHeight: "64px",
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>企业后台系统</span>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Button
              type="primary"
              onClick={() => {
                localStorage.removeItem("token"); // 清除 token
                navigate("/login"); // 跳转到登录页
              }}
            >
              登出
            </Button>
          </div>
        </Header>

        <Content
          style={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            margin: "16px",
            padding: "16px",
            background: "#fff",
          }}
        >
          <Outlet /> {/* 确保嵌套路由内容正确渲染 */}
        </Content>
      </Layout>
    </Layout>
  );
}
