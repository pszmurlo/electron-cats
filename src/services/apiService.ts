import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

export { axiosInstance, AxiosError };
