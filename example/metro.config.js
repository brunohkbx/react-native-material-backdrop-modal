const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const pak = require('../package.json');

const dependencies = Object.keys(pak.dependencies);

module.exports = {
  projectRoot: __dirname,
  watchFolders: [path.resolve(__dirname, '..')],

  resolver: {
    blacklistRE: blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`
      ),
    ]),
    providesModuleNodeModules: [
      'react-native',
      'react',
      '@babel/runtime',
      ...dependencies,
    ],
  },
};
