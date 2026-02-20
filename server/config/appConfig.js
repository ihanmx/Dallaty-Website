const appConfig = {
  frontendUrl: process.env.PROD_FRONTEND_URL || "http://localhost:3000",
  backendUrl: process.env.PROD_BACKEND_URL || "http://localhost:5000",
  // webhookCallbackUrl: process.env.WEBHOOK_CALLBACK_URL,
  isDev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 5000,
};

export default appConfig;
