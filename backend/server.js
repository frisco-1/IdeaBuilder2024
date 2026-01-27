import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import router from './routes/router.js';
import { connectCatalogDatabase, connectCategoryMetaDatabase } from './config/connection.js';
import 'dotenv/config';
import categoryRoutes from "./routes/categories.js";



const app = express();

/* ---------------------------------------------
   CORS CONFIGURATION
   Allows your frontend domains to communicate 
   with your backend API securely.
---------------------------------------------- */
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

/* ---------------------------------------------
   AUTH ROUTES (BetterAuth)
   Must be mounted BEFORE body parsing and router.
---------------------------------------------- */
app.all("/api/auth/*", toNodeHandler(auth));

/* ---------------------------------------------
   BODY PARSERS
   Allows Express to read JSON and form data.
---------------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------
   MAIN APPLICATION ROUTES
---------------------------------------------- */
app.use('/api', router);
/* ---------------------------------------------
   DATABASE CONNECTIONS
   Connect to:
   - Catalog Database (products, userdata)
   - CategoryMeta Database (your new category system)
---------------------------------------------- */
const startServer = async () => {
  try {
    await connectCatalogDatabase();
    await connectCategoryMetaDatabase();

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();