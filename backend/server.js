import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { toNodeHandler } from 'better-auth/node';
import {auth} from './lib/auth.js';
import router from './routes/router.js';
import connectDatabase from './config/database.js';
import 'dotenv/config';

const app = express();

// ✅ CORS
const corsOptions = {
  origin: [
    'http://localhost:4000',
    'https://ideabprinting.com/',
    'https://www.ideabprinting.com/',
    'http://localhost:5173',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Mount BetterAuth routes BEFORE bodyParser and router
app.all("/api/auth/*", toNodeHandler(auth));

// ✅ Body parser and other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

// ✅ Connect DB and start server
await connectDatabase();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
