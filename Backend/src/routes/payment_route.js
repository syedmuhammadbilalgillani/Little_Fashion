import express from "express";
import { createBankAccountDetails, deleteBankAccountById, getBankAccountDetails } from "../controllers/Payment_controller.js";
import { verifyJWT } from "../middleware/auth_middleware.js";

const router = express.Router();




router.post('/createBankDetails', createBankAccountDetails);
router.get('/readBankAccountDetails', verifyJWT, getBankAccountDetails);
router.get('/readBankAccountDetailsadmin', getBankAccountDetails);
router.delete('/deleteBankAccount/:id', deleteBankAccountById);


export default router;
