const allowedOrigins = [
  "http://yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:3000",
  process.env.PROD_FRONTEND_URL,
];

export default allowedOrigins;
