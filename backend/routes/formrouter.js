import express from 'express';
import { submitForm } from '../controller/formcontroller.js';

const router = express.Router();

router.post('/news', submitForm);

export default router;