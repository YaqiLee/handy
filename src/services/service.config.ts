import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.timeout = 20000;

export const Get = (url: string, params?: any) => {
  return axios.get(url, { params }).then((res) => res.data);
};

export const Post = (url: string, data?: any) => {
  return axios.post(url, data).then((res) => res.data);
};

export const Put = (url: string, data?: any) => {
  return axios.put(url, data);
};

export const Delete = (url: string) => {
  return axios.delete(url);
};
