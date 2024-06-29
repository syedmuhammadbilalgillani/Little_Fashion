import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    bankAccountName: {
        type: String,

    },
    bankAccountNumber: {
        type: String,

    },
    accountTitle: {
        type: String,

    },
    transactionId: {
        type: String,

    },
    transactionType: {
        type: String,

    },
    transactionImage: {
        type: String,

    },
    amount: {
        type: Number,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
