import express from 'express';
import userRouter from './routes/userRoutes.js';
import cors from 'cors'
import logger from 'morgan'
import cookieParser from 'cookie-parser';


const app = express();
app.use(logger("dev"))
app.use(express.json())
app.use(cors()) //Cross Origin Resourse Platform
app.use(cookieParser())

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.cookies)
    next();
})

app.use('/api/v1/user', userRouter);
export default app;