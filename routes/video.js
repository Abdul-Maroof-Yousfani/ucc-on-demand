import express from 'express';
const router = express.Router();
import videoController from '../controllers/videoController.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';

router.post('/',[auth,admin],videoController.store);
router.get('/:_id',videoController.viewById);
router.get('/',videoController.view);
router.post('/view/:_id',videoController.addViews)
router.post('/favourite/:_id',videoController.addFavourite)


export default router;