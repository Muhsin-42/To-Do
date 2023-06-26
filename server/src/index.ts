import express  from "express";
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from "./utils/connection";
import todoRoutes from './routes/todoRoutes';
import redisClient from './utils/redis'

const app = express();
dotenv.config();

//DB Connect
connectDB();

//middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('common'))

app.use(cors({
    origin: [ 'http://localhost:5173']
}));
  

//routes
app.use('/api/todo/',todoRoutes);

app.listen(process.env.PORT,()=>{
    console.log('Server is ready at ',process.env.PORT);
})