const {alias, aliasJest} = require('react-app-rewire-alias')

const aliasMap = {
  '@auth': 'src/auth',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)