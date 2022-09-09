import express from 'express';
const router = express.Router();
import subscriptionController from '../controllers/subscriptionController.js';

router.post('/',subscriptionController.store);
router.get('/',subscriptionController.view);

export default router;