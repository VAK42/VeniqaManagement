import { FeaturedSection } from '../database/models/index.js';
export const getAllFeaturedSections = async () => await FeaturedSection.findAll();
export const getFeaturedSectionByName = async (name) => await FeaturedSection.findOne({ where: { name } });
export const upsertFeaturedSection = async (data) => {
  const existing = await FeaturedSection.findOne({ where: { name: data.name } });
  if (existing) {
    return await existing.update(data);
  }
  return await FeaturedSection.create(data);
};
export const deleteFeaturedSection = async (name) => await FeaturedSection.destroy({ where: { name } });