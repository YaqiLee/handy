import { Get, Post } from "./service.config";

export const login = (user: any) => {
  return Post("/login", user);
};

export const loginStatus = () => {
  return Get("/loginStatus");
};
