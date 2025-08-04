import mongoose from 'mongoose';

import 'dotenv/config';

// Single database connection for your cluster with multiple collections
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Database Connected! (Catalog and UserData collections available)');
  } catch (error) {
    console.error('❌ Database Connection Error:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Database Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Database Error:', err);
});

export default connectDatabase;
