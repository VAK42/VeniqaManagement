import { Category, Tariff } from '../database/models/index.js';
const stores = ["Sephora", "Amazon", "Nike", "Adidas", "Zara", "H&M"];
const roles = ["superAdmin", "orderView", "orderManage", "catalogView", "catalogManage", "tariffView", "tariffManage", "categoriesView", "categoriesManage", "featuredView", "featuredManage"];
const weightUnits = ["Lb"];
export const getCatalogBundle = async () => {
  const categories = await Category.findAll();
  const tariffs = await Tariff.findAll();
  return { stores: stores, roles: roles, weightUnits: weightUnits, categories, tariffs };
};
export const getStores = () => stores;
export const getRoles = () => roles;
export const getWeightUnits = () => weightUnits;
export const getCategories = async () => await Category.findAll();
export const createCategory = async (data) => await Category.create(data);
export const getCategoryById = async (id) => await Category.findByPk(id);
export const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Category Not Found!');
  return await category.update(data);
};
export const getTariffs = async () => await Tariff.findAll();
export const createTariff = async (data) => await Tariff.create(data);
export const getTariffById = async (id) => await Tariff.findByPk(id);
export const updateTariff = async (id, data) => {
  const tariff = await Tariff.findByPk(id);
  if (!tariff) throw new Error('Tariff Not Found!');
  return await tariff.update(data);
};