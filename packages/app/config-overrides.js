const { override, babelInclude } = require('customize-cra');
const path = require('path');

// yet another hateful thing
// https://stackoverflow.com/questions/47519948/including-node-modules-in-babel
const disableSymlinks = () => config => {
  return { ...config, resolve: { ...config.resolve, symlinks: false } };
};
module.exports = override(
  disableSymlinks(),
  babelInclude([
    path.resolve('src'),
    // path.resolve('node_modules/@capture/components/src'),
    /@chickenhan\/components/,
  ]),
);
