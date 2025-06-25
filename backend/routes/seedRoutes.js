import express from 'express';
import seedController from '../controllers/seedController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);
router.get('/products', seedController.seedProducts);

export default router;