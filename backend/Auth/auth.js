import Gym from '../Models/gym.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookie_token;
        if(!token){
            return res.status(401).json({
                error: "No token found , Unauthorized"
            });
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SecretKey);
         req.gym = await Gym.findOne({ _id: verifyToken.gym_id });

        next();
    } catch (error) {
        res.status(401).json({
            error: "Unauthorized"
        });
    }
}

export default auth;