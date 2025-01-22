import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import gymRouter from './Routes/gym.js';
import MembershipRouter from './Routes/membership.js';
import Member from './Routes/member.js';
import generalRouter from './Routes/general.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './DBConn/conn.js';
import generateDataRouter from './Routes/generateData.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT|| 4000;
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
connectDB();

const __dirname = path.resolve();

app.use('/auth', gymRouter);
app.use('/plans', MembershipRouter);
app.use('/members', Member);
app.use('/general', generalRouter);
app.use('/generate', generateDataRouter);

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});