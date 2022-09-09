import express from 'express';
const router = express.Router();

import bartenderController from '../../controllers/userTypes/bartenderController.js';

router.post('/drinks/:userid',bartenderController.store);
router.get('/drinks/:userid',bartenderController.getDrinks);
router.put('/drinks/:userid',bartenderController.updateDrink);
router.delete('/drinks/:userid',bartenderController.deleteDrink);
export default router;