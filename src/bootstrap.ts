import path from 'path';
import moduleAlias from 'module-alias';

const rootDirectory = path.resolve(__dirname, '..');

// Add module aliases
moduleAlias.addAliases({
  '@': path.join(rootDirectory, 'dist'),
});