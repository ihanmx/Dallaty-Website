import paytabs from "paytabs_pt2";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const PROFILE_ID = process.env.PAYTABS_PROFILE_ID;
const SERVER_KEY = process.env.PAYTABS_SERVER_KEY;
const REGION = "SAU"; // Saudi Arabia

paytabs.setConfig(PROFILE_ID, SERVER_KEY, REGION);

export default paytabs;
