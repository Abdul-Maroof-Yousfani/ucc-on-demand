import express from 'express';
const router = express.Router();
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

import userController from '../controllers/user.js';

router.put('/:_id',[auth],userController.userProfile);
router.get('/',[auth,admin],userController.all);
router.put('/profile/:_id',[auth,admin],userController.profile);
router.put('/restrict/:_id',[auth,admin],userController.restrictUser);
router.put('/enableUser/:_id',[auth,admin],userController.enableUser);


export default router;