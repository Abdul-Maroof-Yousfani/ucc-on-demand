import express from 'express';
const router = express.Router();
import channelController from '../controllers/chanelController.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

router.post('/',[auth,admin],channelController.store);
router.get('/',[auth],channelController.view);
router.put('/:_id',[auth,admin],channelController.update);
router.delete('/subscription',[auth,admin],channelController.removeSubscription);
router.delete('/category',[auth,admin],channelController.removeCategory);
// router.delete('/subscription/:_id',[auth,admin],channelController.remove);




export default router;