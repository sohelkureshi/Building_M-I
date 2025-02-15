const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/config');
const cors = require('cors');

const startServer = async () => {
  try {
    await connectDB();

    // Enable CORS to allow frontend requests
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

    app.listen(config.port, () => {
      console.log(`✅ Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
