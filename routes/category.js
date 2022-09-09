import express from 'express';
const router = express.Router();

import categoryController from '../controllers/categoryController.js';

router.post('/',categoryController.store);
router.get('/',categoryController.view);



export default router;