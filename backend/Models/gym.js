import mongoose from 'mongoose';

const gymSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gymName: {
        type: String,
        required: true
    }
},{timestamps: true});

const model = mongoose.model('gym', gymSchema);
export default model;