import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

export const Get = (url: string, params?: any) => {
  return axios.get(url, { params }).then((res) => res.data);
};

export const Post = (url: string, data?: any) => {
  return axios.post(url, data).then((res) => res.data);
};
