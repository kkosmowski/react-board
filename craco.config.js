const CracoLess = require('craco-less');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        baseUrl: '.',
        source: 'tsconfig',
        tsConfigPath: './tsconfig.paths.json',
        // debug: true,
      }
    }
  ],
};