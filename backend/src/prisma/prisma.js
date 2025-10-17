import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger.js'; // adjust path if needed

const prisma = new PrismaClient();

prisma.$on('query', (e) => {
  logger.debug({
    message: 'Prisma Query Executed',
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`,
  });
});

export { prisma };
