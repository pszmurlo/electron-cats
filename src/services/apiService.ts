import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cat-fact.herokuapp.com",
});

export { axiosInstance, AxiosError };
