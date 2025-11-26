import * as uiService from '../services/uiService.js';
export const getAllFeaturedSections = async (req, res) => {
  try {
    const result = await uiService.getAllFeaturedSections();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getFeaturedSection = async (req, res) => {
  try {
    const result = await uiService.getFeaturedSectionByName(req.query.name);
    if (!result) return res.status(404).json({ error: 'Section Not Found!' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const upsertFeaturedSection = async (req, res) => {
  try {
    const result = await uiService.upsertFeaturedSection(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteFeaturedSection = async (req, res) => {
  try {
    await uiService.deleteFeaturedSection(req.body.name);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};