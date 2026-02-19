import axios from "axios";
import config from "../config/index";
const { apiUrl } = config;

console.log("API URL:", apiUrl); // Debug: تأكد من قراءة العنوان الصحيح

export default axios.create({ baseURL: apiUrl }); //this is used for public routes

export const axiosPrivate = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
}); //this is used for private routes
