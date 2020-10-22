import axios from "axios";

// axios.defaults.baseURL = "http://101.200.167.196:4400/api/";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 2000,
  withCredentials: true,
});

export const Get = (url: string, params?: any) => {
  return instance.get(url, { params }).then((res) => res.data);
};

export const Post = (url: string, data?: any) => {
  return instance.post(url, data).then((res) => res.data);
};

export const Put = (url: string, data?: any) => {
  return instance.put(url, data);
};

export const Delete = (url: string) => {
  return instance.delete(url);
};
