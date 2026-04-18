import express from 'express'
import cors from 'cors'
import importantRouter from '../routes/router.js'
import session from 'express-session'

import { initCronTasks } from './shared/cron.js';

import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import * as dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
    debug: true
});

const port = process.env.PORT
const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
    throw new Error('SESSION_SECRET is not defined in .env file!');
}

declare module "express-session" {
    interface SessionData {
        username?: string,
        userId?: number
    }
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Слишком много запросов с этого IP, подождите',
    standardHeaders: true,
    legacyHeaders: false,
})


const app = express()


app.use(helmet())
app.set('trust proxy', 1)

app.use(limiter)

app.use(cors({
    origin: 'http://localhost',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']     
}))

app.use(express.json())
app.use(session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
}))





app.use(importantRouter)

app.get('/ping', (req, res) => {
    return res.status(200).json({message: 'Пинг'})
})


initCronTasks()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


