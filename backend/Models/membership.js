import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    gym_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym',
        required: true
    }

});

const modelMembership = mongoose.model('membership', membershipSchema);

export default modelMembership;