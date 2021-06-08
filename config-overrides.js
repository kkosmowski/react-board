const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const { alias, aliasJest, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd', libraryDirectory: 'es', style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  }),
  alias(aliasMap),
)

module.exports.jest = aliasJest(aliasMap)