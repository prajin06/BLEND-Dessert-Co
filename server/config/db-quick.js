const connectDB = async () => {
  try {
    // Skip MongoDB connection for now - use in-memory data
    console.log('MongoDB connection skipped for quick deployment');
    return;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
