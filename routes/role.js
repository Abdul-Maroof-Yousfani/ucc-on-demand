import express from 'express';
const router = express.Router();
import role from '../controllers/role.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';

router.post('/',[auth,admin],role.store);
router.get('/',[auth,admin],role.view);
router.put('/:_id',[auth,admin],role.update);



export default router;