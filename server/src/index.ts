// server/src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from './utils/prisma';
import { SchedulerService } from './services/scheduler.service';
import { triggerMonitoringJob } from './services/monitoring.service'; // Import the monitoring service

// Import routes
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import aiRoutes from './routes/ai.routes';
import testRoutes from './routes/test.routes';
import keywordRoutes from './routes/keyword.routes';
import mentionRoutes from './routes/mention.routes';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});
export { io };

// Socket.io authentication middleware
io.use(async (socket: any, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error: token required'));
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return next(new Error('JWT secret not configured'));
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    // Attach clientId to socket
    socket.clientId = decoded.clientId;
    socket.join(decoded.clientId);
    next();
  } catch (err) {
    next(new Error('Authentication error: invalid token'));
  }
});

io.on('connection', (socket: any) => {
  const clientId = socket.clientId;
  console.log(`Socket connected for clientId: ${clientId}`);
  socket.on('disconnect', () => {
    console.log(`Socket disconnected for clientId: ${clientId}`);
  });
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/test', testRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/mentions', mentionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', error);
  
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  
  return res.status(500).json({ error: 'Internal server error' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  SchedulerService.stop();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  SchedulerService.stop();
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Initialize scheduler for posts
    SchedulerService.initialize();
    
    // Start monitoring service job immediately on start in development for faster feedback
    if (process.env.NODE_ENV === 'development') {
      console.log('Running initial monitoring job in development mode...');
      // Use setImmediate to run it right after the current event loop finishes
      setImmediate(triggerMonitoringJob);
    }

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🔌 Socket.io running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();