import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from '@/routes';
import config from '@/config';
import { errorMiddleware } from '@/middleware';
import logger from '@/utils/logger';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeSwagger();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware() {
    // Security
    this.app.use(helmet());
    this.app.use(cors({
      origin: config.cors.origin,
      credentials: true,
    }));

    // Parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Compression
    this.app.use(compression());
    
    // Logging
    if (config.env !== 'test') {
      this.app.use(morgan(config.log.format, {
        stream: {
          write: (message: string) => {
            logger.info(message.trim());
          },
        },
      }));
    }
  }

  private initializeRoutes() {
    this.app.use(config.apiPrefix, routes);
    
    // Root route
    this.app.get('/', (_req: Request, res: Response) => {
      res.json({
        message: 'API is running',
        docs: `${config.apiPrefix}/docs`,
        health: `${config.apiPrefix}/health`
      });
    });
  }

  private initializeSwagger() {
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
            url: `http://localhost:${config.port}${config.apiPrefix}`,
            description: 'Development server',
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

    // Serve swagger docs directly (not inside API prefix)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
    }));

    // Also serve swagger docs inside API prefix for convenience
    this.app.use(`${config.apiPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
    }));
  }

  private initializeErrorHandling() {
    // 404 handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({
        status: 404,
        message: `Not Found - ${req.originalUrl}`,
      });
    });

    // Error middleware
    this.app.use(errorMiddleware);
  }
}

export default new App().app;