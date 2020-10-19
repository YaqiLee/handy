import { Get, Post } from "./service.config";

export const getGoods = () => Get("/goods/");

export const saveGoods = (data: any) => Post("/goods/", data)