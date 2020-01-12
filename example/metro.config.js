const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const pak = require('../package.json');

const modules = [
  '@babel/runtime',
  '@expo/vector-icons',
  ...Object.keys(pak.dependencies),
  ...Object.keys(pak.peerDependencies),
];

module.exports = {
  projectRoot: __dirname,
  watchFolders: [path.resolve(__dirname, '..')],

  resolver: {
    blacklistRE: blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`
      ),
    ]),
    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};
