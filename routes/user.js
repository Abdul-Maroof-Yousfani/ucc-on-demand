import express from 'express';
const router = express.Router();

import userController from '../controllers/user.js';

router.put('/updateProfile/:id',userController.profile);


export default router;