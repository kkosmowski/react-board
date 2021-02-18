const { alias, aliasJest } = require('react-app-rewire-alias')

const aliasMap = {
  '@auth': 'src/auth',
  '@contexts': 'src/contexts',
  '@enums': 'src/domain/enums',
  '@interfaces': 'src/domain/interfaces',
  '@main': 'src/main',
  '@services': 'src/services',
  '@utils': 'src/utils',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)