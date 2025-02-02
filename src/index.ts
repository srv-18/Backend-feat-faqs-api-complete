import express from 'express';
import cors from 'cors';
import { faqsRouter } from './routes/faqs';
import { adminRouter } from './routes/admin';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/api", adminRouter);
app.use("/api/faqs", faqsRouter);


async function main() { 
    const dataBaseUrl = process.env.DB_URL || "";
    await mongoose.connect(dataBaseUrl);
    console.log("MongoDB connected");

    app.listen(process.env.PORT);
}

main();