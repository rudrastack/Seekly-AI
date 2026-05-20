import app from './src/app.js';
import "dotenv/config";
import connectDB from './src/config/database.js';
import http from 'http';
import { initSocketServer } from './src/sockets/server.socket.js';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

initSocketServer(httpServer);

connectDB()

  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with an error code
  });


httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

