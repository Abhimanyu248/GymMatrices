import Membership from '../Models/membership.js';
import mongoose from 'mongoose';


export const addmembership = async (req, res) => {
    try {
        const { month, price } = req.body;
        const membership = await Membership.findOne({gym_id: req.gym._id,month});
        if(membership){
            membership.price = price;
            await membership.save();
            res.status(201).json({ message: "Updated successfully" });
        }
        else{
            const newmembership = new Membership({ gym_id: req.gym._id, month, price });
            await newmembership.save();
            res.status(201).json({ message: "Added successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to add membership" });
    }
}

export const getmembership = async (req, res) => {
    try {
        const membership = await Membership.find({ gym_id: req.gym._id }).sort({ month: 1 });
        res.status(200).json({
            message: "Membership fetched successfully",
            membership});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to get membership" });
    }
}

export const deletemembership = async (req, res) => {
    try {

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const membership = await Membership.findOneAndDelete({ gym_id: req.gym._id, _id: req.params.id });
        if (membership) {
            res.status(200).json({ message: "Membership deleted successfully" });
        } else {
            res.status(400).json({ message: "Membership not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to delete membership" });
    }
}