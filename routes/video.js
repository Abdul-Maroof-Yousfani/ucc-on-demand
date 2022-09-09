import express from 'express';
const router = express.Router();
import videoController from '../controllers/videoController.js';

router.post('/',videoController.store);
router.get('/',videoController.view);
router.post('/view/:_id',videoController.addViews)
router.post('/favourite/:_id',videoController.addFavourite)


export default router;