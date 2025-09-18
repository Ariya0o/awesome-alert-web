import React from "react";
import { ConfigProvider, theme } from "antd";
import { Helmet } from "react-helmet";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

export default function App() {
  const element = useRoutes(routes);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Helmet>
        <title>Alert 后台</title>
      </Helmet>
      {element}
    </ConfigProvider>
  );
}
