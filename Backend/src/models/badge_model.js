import mongoose from 'mongoose';

const { Schema } = mongoose;

const badgeSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge 
