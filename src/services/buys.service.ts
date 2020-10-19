import { Delete, Get, Post, Put } from "./service.config";

export const getGoods = () => Get("/goods/");

export const saveGoods = (data: any) => Post("/goods/", data);

export const updateGoodsOrder = (data: any) => Put("/goods/order", data);

export const deleteGoodsById = (id: number) => Delete(`/goods/${id}`);
