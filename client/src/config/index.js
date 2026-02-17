const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  websiteUrl: process.env.REACT_APP_WEBSITE_URL,
  enableLogs: process.env.REACT_APP_ENABLE_LOGS === "true",
  isProd: process.env.NODE_ENV === "production",
  isDev: process.env.NODE_ENV === "development",
};

export default config;
