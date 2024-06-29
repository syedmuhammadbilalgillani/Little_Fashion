import express from 'express';
import { readContactForm, submitContactForm } from '../controllers/contactForm_controller.js';
const router = express.Router();


router.post('/submitForm', submitContactForm)
router.get('/getsubmitForm', readContactForm)
export default router;