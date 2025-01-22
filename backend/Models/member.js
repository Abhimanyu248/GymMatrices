

import mongoose from'mongoose';

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    emergency_phone: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    payment:{
        type: String
    },
    joiningdate: {
        type: Date,
        default: Date.now
    },
    membership: {
        type: new mongoose.Schema({
            month: { type: Number, required: true },
            price: { type: Number, required: true },
            gym_id: { type: mongoose.Schema.Types.ObjectId, ref: 'gym', required: true },
        }, { _id: false }), // Embedded membership details
        required: true
    },
    gym_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym',
        required: true
    },
    image_url: {
        type: String,
    },
    address: {
        type: String
    },
    nextPaymentDate: {
        type: Date
    }
}, { timestamps: true });

const modelMember = mongoose.model('Member', memberSchema);

export default modelMember;
