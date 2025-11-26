import * as catalogService from '../services/catalogService.js';
export const getProducts = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const offset = (page - 1) * limit || 0;
    const result = await catalogService.getAllProducts(parseInt(limit) || 20, offset);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const product = await catalogService.createProduct(req.body, req.user);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await catalogService.updateProduct(req.params.id, req.body, req.user);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    await catalogService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};