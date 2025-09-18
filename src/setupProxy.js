const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3002", // 确保后端服务地址正确
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 移除 /api 前缀
      },
    })
  );
};