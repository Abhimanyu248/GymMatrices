import express from 'express';
import * as gymcontroller from'../Controllers/gym.js';


const router = express.Router();

router.post('/register',gymcontroller.register);
router.post('/login',gymcontroller.login);
router.post('/logout',gymcontroller.logout);


export default router;