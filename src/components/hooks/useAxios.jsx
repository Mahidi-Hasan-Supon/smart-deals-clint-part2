import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-server-part2-swart.vercel.app",
});
export const useAxios = () => {
  return axiosInstance;
};
