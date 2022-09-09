import express from 'express';
const router = express.Router();
import role from '../controllers/role.js';

router.post('/store',role.store);



export default router;