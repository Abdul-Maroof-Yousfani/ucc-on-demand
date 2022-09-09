import express from 'express';
const router = express.Router();

import favouriteController from '../controllers/favouriteController.js';

router.put('/store/:id',favouriteController.store);


export default router;