import mongoose from 'mongoose';
import 'dotenv/config';

// Connect to Catalog Database
const connectCatalogDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CATALOG);
    console.log('✅ Catalog Database Connected! (Catalog & UserData collections available)');
  } catch (error) {
    console.error('❌ Catalog Database Connection Error:', error);
    process.exit(1);
  }
};


// Connect to CategoryMeta Database (separate DB)
const connectCategoryMetaDatabase = async () => {
  try {
    const categoryMetaConnection = await mongoose.createConnection(
      process.env.DB_CATEGORY_META
    );

    categoryMetaConnection.on("connected", () => {
      console.log("✅ CategoryMeta Database Connected!");
    });

    categoryMetaConnection.on("error", (err) => {
      console.error("❌ CategoryMeta Database Error:", err);
    });

    categoryMetaConnection.on("disconnected", () => {
      console.log("⚠️ CategoryMeta Database Disconnected");
    });

    return categoryMetaConnection;
  } catch (error) {
    console.error("❌ CategoryMeta Database Connection Error:", error);
    process.exit(1);
  }
};

// Catalog DB events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Catalog Database Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Catalog Database Error:', err);
});

export { connectCatalogDatabase, connectCategoryMetaDatabase };