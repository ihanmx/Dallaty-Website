import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  //allows access with no origins like mobiles apps or curl
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      //no origin for dev
      callback(null, true); //err null so allow access
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
