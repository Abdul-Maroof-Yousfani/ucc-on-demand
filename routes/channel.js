import express from 'express';
const router = express.Router();
import channelController from '../controllers/chanelController.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

router.post('/',[auth,admin],channelController.store);
router.get('/',[auth],channelController.view);
router.put('/:_id',[auth,admin],channelController.update);




export default router;