const {alias, aliasJest} = require('react-app-rewire-alias')

const aliasMap = {
  '@auth': 'src/auth',
  '@interfaces': 'src/domain/interfaces',
  '@contexts': 'src/contexts',
  '@services': 'src/services',
  '@utils': 'src/utils',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)