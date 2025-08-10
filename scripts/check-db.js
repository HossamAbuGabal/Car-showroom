const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '..', 'env.local') });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }
  try {
    const connection = await mongoose.connect(uri);
    console.log('MongoDB Connected to host:', connection.connection.host);
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

main();


