import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import { sendEmail } from './emailService.js';
import videoRoutes from './routes/videos.js';
import photoRoutes from './routes/photos.js';
import authRoutes from './routes/authRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchesRoutes.js';
import aboutSectionRoutes from './routes/aboutSection.js';
import standingsRoutes from './routes/standingsRoutes.js';
import heroSectionRoutes from './routes/heroSection.js';
import playerProfileRoutes from './routes/playerProfileRoute.js';
import UpcomingMatchRoutes from './routes/UpcomingMatchRoutes.js';

const app = express();

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not set in the environment variables');
  process.exit(1);
}

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://jfc-nrk2k488w-janmejay-kumars-projects.vercel.app'], // Allow only your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If using cookies or authentication
}));

  // CORS setup for frontend
app.use(cookieParser());  // Cookie parsing (optional if using cookies)

// Static Files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API Routes
app.use('/api/videos', videoRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/aboutsection', aboutSectionRoutes);
app.use('/api/herosection', heroSectionRoutes);
app.use('/api/playerProfiles', playerProfileRoutes);
app.use('/api/standings', standingsRoutes);
app.use('/api/Upcomingmatches', UpcomingMatchRoutes);
app.use('/api/auth', authRoutes);
app.post('/send-email', sendEmail); 

// Base Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Football Club Backend is Running',
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
    path: req.path,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const response = {
    message: 'Something went wrong!'
  };

  if (process.env.NODE_ENV !== 'production') {
    response.error = err.message;
  }

  res.status(err.status || 500).json(response);
});

// Graceful Shutdown
const handleShutdown = async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
};

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

export default app;
