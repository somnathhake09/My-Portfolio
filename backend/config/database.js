const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || '';

  if (!uri || uri.includes('YOUR_USERNAME')) {
    console.error('\n❌  MONGODB_URI is not set!');
    console.error('    Open  backend/.env  and replace YOUR_USERNAME and YOUR_PASSWORD\n');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('✅  Atlas connected →', mongoose.connection.host);
  } catch (err) {
    console.error('\n❌  Atlas connection FAILED:', err.message);
    console.error('\n   Fix checklist:');
    console.error('   1. Is your MONGODB_URI correct in backend/.env ?');
    console.error('   2. Atlas → Network Access → Add IP → 0.0.0.0/0 (allow all)');
    console.error('   3. Atlas → Database Access → user has readWriteAnyDatabase role');
    console.error('   4. Check your internet connection\n');
    process.exit(1);
  }
};

module.exports = connectDB;
