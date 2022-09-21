import express from 'express';
const router = express.Router();
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import categoryController from '../controllers/categoryController.js';

router.post('/',[auth,admin],categoryController.store);
router.get('/',[auth],categoryController.view);
router.get('/tags',[auth],categoryController.tags);
router.put('/:_id',[auth,admin],categoryController.update);
router.delete('/:_id',[auth,admin],categoryController.archive);
router.delete('/',[auth,admin],categoryController.removeGetStarted);
router.put('/',[auth,admin],categoryController.updateGetStartedVideo);






export default router;