// Register module aliases first - this is similar to Next.js approach
require('module-alias').addAliases({
    '@': __dirname,
  });
  
  // Export the Express app for Vercel
  module.exports = require('./app');