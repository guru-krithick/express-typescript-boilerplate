import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express TypeScript API',
    version: '1.0.0',
    description: 'A RESTful API built with Express and TypeScript',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'API Support',
      url: 'https://your-website.com',
      email: 'support@your-email.com',
    },
  },

  components: {
    responses: {
      NotFoundError: {
        description: 'The requested resource was not found',
      },
      ValidationError: {
        description: 'Validation failed for the request parameters',
      },
      ServerError: {
        description: 'Internal server error',
      },
    },
  },
  tags: [
    {
      name: 'Health',
      description: 'API health check endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    './src/controllers/*.ts',
    './src/routes/*.ts',
    './src/models/*.ts',
    './src/docs/components/*.yaml',
  ],
};

export default swaggerJSDoc(options);