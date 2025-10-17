import express from 'express';
import { sampleRoute } from './routes/sampleRoute.js';
import { authRoute } from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger } from './middlewares/logger.js';
import { responseHandler } from './utils/responseHandler.js';

const app = express();

// middleware
app.use(responseHandler);
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// sample route
app.use('/sample', sampleRoute);
// auth routes
app.use('/api/v1/auth', authRoute);

// error handler middleware to catch errors
app.use(errorHandler);

export default app;