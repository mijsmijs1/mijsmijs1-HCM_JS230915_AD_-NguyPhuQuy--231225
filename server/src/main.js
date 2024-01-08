import Router from './routes';
import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
dotEnv.config()
const app = express();

app.use(express.json())
app.use(cors())
app.use(Router)
app.listen(3000,()=>{
    console.log(`Sever on:${process.env.SEVER_HOST}:${process.env.SEVER_PORT}`);
})