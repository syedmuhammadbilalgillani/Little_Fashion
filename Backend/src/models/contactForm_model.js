// models/formModel.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const formSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
});

export default model('FormData', formSchema);
