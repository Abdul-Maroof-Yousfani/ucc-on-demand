import express from 'express';
const router = express.Router();
import authentication from '../controllers/authentication.js';


router.post('/register',authentication.register);
router.post('/login',authentication.login);
router.post('/changePassword',authentication.changePassword);
router.post('/socialLogin',authentication.socialLogin);


export default router;