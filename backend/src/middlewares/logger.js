import logger from '../utils/logger.js';

export const requestLogger = (req, _res, next) => {
  logger.info(`Incoming request from ${req?.method} ${req?.originalUrl}`);
  return next();
};
