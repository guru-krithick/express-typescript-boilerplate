import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes';
import config from './config';
import { errorMiddleware } from './middleware';
import logger from './utils/logger';

// Create the Express application
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// Logging middleware (only in non-test environments)
if (config.env !== 'test') {
  app.use(morgan(config.log.format, {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  }));
}

// Define swagger options
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript API',
      version: '1.0.0',
      description: 'A RESTful API built with Express and TypeScript',
    },
    servers: [
      {
        url: config.apiPrefix,
        description: 'API server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts', './src/docs/components/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
}));
app.use(`${config.apiPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
}));

// Routes
app.use(config.apiPrefix, routes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API is running',
    docs: `/api-docs`,
    health: `${config.apiPrefix}/health`
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: `Not Found - ${req.originalUrl}`,
  });
});

// Error middleware
app.use(errorMiddleware);

// For serverless environments (Vercel), export the Express app
// This allows Vercel to import and use it directly
module.exports = app;
export default app;