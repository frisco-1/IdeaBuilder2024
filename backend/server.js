import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js'; // Note the .js extension
import router from './routes/router.js';
import connectDatabase from './config/database.js';
import 'dotenv/config';
import { auth } from "./auth"; // path to your Better Auth server instance


const app = express();

const corsOptions = {
  origin: '*',
  credentials: true, 
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

//Better Auth Handler - MUST come before other middleware
app.all("/api/auth/*", toNodeHandler(auth));

//Other middleware after Better Auth Handler
app.use(bodyParser.json()); //submitting the form data as json data.
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', router); //this line is necessary to have at the end.


// Initialize database connection
await connectDatabase();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})



