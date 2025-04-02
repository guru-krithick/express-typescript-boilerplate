// Register path aliases first
import './bootstrap';

import express, { Application, Request, Response } from 'express';
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

// Create Express app
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

// Logging middleware
if (config.env !== 'test') {
  app.use(morgan(config.log.format, {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  }));
}

// Swagger setup
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript API',
      version: '1.0.0',
      description: 'A RESTful API built with Express and TypeScript',
    },

    components: {
      responses: {
        NotFoundError: {
          description: 'The requested resource was not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    example: 404
                  },
                  message: {
                    type: 'string',
                    example: 'Resource not found'
                  }
                }
              }
            }
          }
        },
        ValidationError: {
          description: 'Validation failed for the request parameters',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    example: 400
                  },
                  message: {
                    type: 'string',
                    example: 'Validation failed'
                  }
                }
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    example: 500
                  },
                  message: {
                    type: 'string',
                    example: 'Internal server error'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts', './src/docs/components/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(`${config.apiPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use(config.apiPrefix, routes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API is running',
    docs: `/docs`,
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

// Export for both local development and serverless
export default app;
module.exports = app;