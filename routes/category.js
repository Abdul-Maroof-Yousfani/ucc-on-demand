import express from 'express';
const router = express.Router();
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import categoryController from '../controllers/categoryController.js';

router.post('/',[auth,admin],categoryController.store);
router.get('/',[auth],categoryController.view);



export default router;