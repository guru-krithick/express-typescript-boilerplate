import app from './app';
import config from './config';
import logger from './utils/logger';

// Only create a server if we're running locally
// This prevents issues with Vercel serverless deployment
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  const PORT = config.port;
  
  const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`API Documentation: http://localhost:${PORT}/docs`);
  });
  
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };
  
  const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    exitHandler();
  });
}

// Always export the Express app for serverless environments
module.exports = app;
export default app;