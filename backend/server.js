import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import doctorRouter from './routes/doctorRoute.js';
import adminRouter from './routes/adminRoute.js'; 
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv';

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());  // <-- Move this before routes!

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);  // <-- This is correct

app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => {
    console.log(`Server started!! on port : ${port}`);
});
