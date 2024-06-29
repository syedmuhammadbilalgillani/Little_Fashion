import Payment from "../models/payment_model.js";



export const createBankAccountDetails = async (req, res) => {
    try {
        // Extracting required fields from request body
        const { bankAccountName, bankAccountNumber, accountTitle } = req.body;

        // Check if required fields are present
        if (!bankAccountName || !bankAccountNumber || !accountTitle) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Creating a new Payment document
        const newPayment = new Payment({
            bankAccountName,
            bankAccountNumber,
            accountTitle,
        });

        // Saving the Payment document to the database
        await newPayment.save();

        res.status(201).json({
            message: "Bank account entry created successfully",
            payment: newPayment,
        });
    } catch (error) {
        console.error("Error creating bank account entry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






// to read bank account details from checkout section for user
export const getBankAccountDetails = async (req, res) => {
    try {
        // Fetching all Payment documents from the database
        const bankAccounts = await Payment.find();

        res.status(200).json({ bankAccounts });
    } catch (error) {
        console.error("Error fetching bank account details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteBankAccountById = async (req, res) => {
    const { id } = req.params; // Assuming id is passed as a route parameter

    try {
        // Find the payment document by ID and delete it
        const deletedBankAccount = await Payment.findByIdAndDelete(id);

        if (!deletedBankAccount) {
            return res.status(404).json({ message: "Bank account not found" });
        }

        res.status(200).json({ message: "Bank account deleted successfully" });
    } catch (error) {
        console.error("Error deleting bank account:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};