import express from 'express';
const router = express.Router();
import subscriptionController from '../controllers/subscriptionController.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';


router.post('/',[auth,admin],subscriptionController.store);
router.get('/',[auth],subscriptionController.view);

export default router;