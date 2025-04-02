# Node.js Express TypeScript Boilerplate for Vercel

A production-ready boilerplate for building RESTful APIs using Node.js, Express, and TypeScript with Swagger documentation, optimized for Vercel deployment.

## Features

- **TypeScript**: Type-safe JavaScript
- **Express**: Fast, unopinionated, minimalist web framework
- **Swagger Documentation**: API documentation with swagger-jsdoc and swagger-ui-express
- **Error Handling**: Centralized error handling
- **Security**: Helmet for security headers
- **Logging**: Winston for logging
- **Environment Variables**: dotenv for environment variables
- **Code Quality**: ESLint and Prettier for code quality
- **API Monitoring**: Health check endpoint
- **Vercel Deployment**: Ready to deploy on Vercel

## Project Structure

```
/
├── src/
│   ├── api/           # API routes (for Vercel serverless functions)
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Custom middleware
│   ├── routes/        # Route definitions
│   ├── utils/         # Utility functions
│   ├── config/        # Configuration
│   ├── types/         # TypeScript type definitions
│   ├── app.ts         # Express app setup
│   └── server.ts      # Local development server
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore file
├── package.json       # Package dependencies
├── tsconfig.json      # TypeScript configuration
├── vercel.json        # Vercel configuration
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/express-typescript-vercel.git
cd express-typescript-vercel
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Copy `.env.example` to `.env` and update the values
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open http://localhost:8000/docs to view the API documentation

## Deployment to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
# or
yarn global add vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy to Vercel

```bash
vercel
```

### Step 4: Set Environment Variables

You can set environment variables in the Vercel dashboard or with the CLI:

```bash
vercel env add JWT_SECRET
```

### Step 5: Production Deployment

```bash
vercel --prod
```

## Adding New Routes

1. Create a new controller in `src/controllers`
2. Create a new route in `src/routes`
3. Add the route to `src/routes/index.ts`

## API Documentation

The API documentation is available at `/docs` when the server is running.

## License

MIT