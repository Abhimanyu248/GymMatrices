import mongoose from 'mongoose';



const connectDB = async () => {
    // try {
    //     await mongoose.connect('mongodb://127.0.0.1:27017/gymbackend');
    //     console.log("Connected to Database");
    // } catch (e) {
    //     console.log(e);
    // }
    mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@gymmanagement.fa1ci.mongodb.net/gymbackend?retryWrites=true&w=majority&appName=GymManagement`).then(() => {
        console.log("Connected to Database");
    }).catch((e) => {
        console.log(e);
    })
};

export default connectDB;




