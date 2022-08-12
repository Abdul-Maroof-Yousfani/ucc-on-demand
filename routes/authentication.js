import express from 'express';
const router = express.Router();
import authentication from '../controllers/authentication.js';

router.post('/register',authentication.register);


export default router;