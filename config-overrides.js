const { alias, aliasJest } = require('react-app-rewire-alias')

const aliasMap = {
  '@auth': 'src/app/auth',
  '@contexts': 'src/app/contexts',
  '@enums': 'src/app/domain/enums',
  '@images': 'src/assets/images',
  '@interfaces': 'src/app/domain/interfaces',
  '@main': 'src/app/main',
  '@main/category': 'src/app/main/category',
  '@main/footer': 'src/app/main/footer',
  '@main/header': 'src/app/main/header',
  '@main/thread': 'src/app/main/thread',
  '@models': 'src/app/domain/models',
  '@responses': 'src/app/domain/responses',
  '@services': 'src/app/services',
  '@utils': 'src/app/utils',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)