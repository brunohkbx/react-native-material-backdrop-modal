const path = require('path');
const pak = require('./package.json');

const dependencies = Object.keys(pak.dependencies);

const extraNodeModules = {};
dependencies.forEach(dep => {
  extraNodeModules[dep] = path.resolve(__dirname, 'node_modules', dep);
});

module.exports = {
  projectRoot: __dirname,
  watchFolders: [path.resolve(__dirname, '..')],

  resolver: {
    extraNodeModules,
  },
};
