import express from 'express';
const router = express.Router();

import channelController from '../controllers/chanelController.js';

router.post('/',channelController.store);




export default router;