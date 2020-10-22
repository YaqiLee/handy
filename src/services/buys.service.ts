import { Delete, Get, Post, Put } from "./service.config";

export const getGoods = (bought: number) => Get("/goods/", { bought });

export const saveGoods = (data: any) => Post("/goods/", data);

export const updateGoods = (data: any) => Put("/goods", data);

export const batchUpdateGoods = (data: any[]) => Put("/goods/batch", data);

export const deleteGoodsById = (id: number) => Delete(`/goods/${id}`);

export const goodsCount = () => Get(`/goods/count`);

