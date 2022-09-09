import express from 'express';
const router = express.Router();
import followController from '../controllers/followController.js';

router.post('/:userId',followController.follow);
router.get('/:userId',followController.getFollowers);
router.delete('/:userId',followController.deleteFollower);



export default router;