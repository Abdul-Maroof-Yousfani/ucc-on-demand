import express from 'express';
const router = express.Router();

import ratingController from '../controllers/ratingController.js';

router.post('/:userId',ratingController.rateUser);


export default router;