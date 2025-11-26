import { Product } from '../database/models/index.js';
export const getAllProducts = async (limit = 20, offset = 0) => {
  return await Product.findAndCountAll({ limit, offset });
};
export const getProductById = async (id) => {
  return await Product.findByPk(id);
};
export const createProduct = async (data, user) => {
  const auditLog = { createdBy: user.email, createdOn: new Date() };
  const product = await Product.create({ ...data, auditLog });
  console.log('Product Created!');
  return product;
};
export const updateProduct = async (id, data, user) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product Not Found!');
  const auditLog = { ...product.auditLog, updatedBy: user.email, updatedOn: new Date() };
  await product.update({ ...data, auditLog });
  console.log('Product Updated!');
  return product;
};
export const deleteProduct = async (id) => {
  const result = await Product.destroy({ where: { id } });
  console.log('Product Deleted!');
  return result;
};