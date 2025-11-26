import * as referenceDataService from '../services/referenceDataService.js';
export const getCatalogBundle = async (req, res) => {
  try {
    const result = await referenceDataService.getCatalogBundle();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getStores = (req, res) => res.status(200).json(referenceDataService.getStores());
export const getRoles = (req, res) => res.status(200).json(referenceDataService.getRoles());
export const getWeightUnits = (req, res) => res.status(200).json(referenceDataService.getWeightUnits());
export const getCategories = async (req, res) => {
  try {
    const result = await referenceDataService.getCategories();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createCategory = async (req, res) => {
  try {
    const result = await referenceDataService.createCategory(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const result = await referenceDataService.updateCategory(req.body.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getTariffs = async (req, res) => {
  try {
    const result = await referenceDataService.getTariffs();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createTariff = async (req, res) => {
  try {
    const result = await referenceDataService.createTariff(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateTariff = async (req, res) => {
  try {
    const result = await referenceDataService.updateTariff(req.body.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};