// This sets up TypeScript path aliases at runtime
import * as tsconfig from 'tsconfig-paths';
import * as path from 'path';

// Register path aliases
const baseUrl = path.join(__dirname, '..');
const { absoluteBaseUrl, paths } = require('../tsconfig.json').compilerOptions;

tsconfig.register({
  baseUrl,
  paths: { 
    '@/*': ['dist/*'] 
  }
});