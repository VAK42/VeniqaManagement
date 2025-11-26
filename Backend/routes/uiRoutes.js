import { Router } from 'express';
import * as controller from '../controllers/uiController.js';
import { isAuthenticated, hasPermission } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/featured', isAuthenticated, hasPermission('featuredView'), controller.getFeaturedSection);
router.get('/featuredList', isAuthenticated, hasPermission('featuredView'), controller.getAllFeaturedSections);
router.post('/featured', isAuthenticated, hasPermission('featuredManage'), controller.upsertFeaturedSection);
router.delete('/featured', isAuthenticated, hasPermission('featuredManage'), controller.deleteFeaturedSection);
export default router;