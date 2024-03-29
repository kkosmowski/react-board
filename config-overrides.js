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
  '@main/profile': 'src/app/main/profile',
  '@main/thread': 'src/app/main/thread',
  '@models': 'src/app/domain/models',
  '@payloads': 'src/app/domain/payloads',
  '@responses': 'src/app/domain/responses',
  '@services': 'src/app/services',
  '@store': 'src/app/store',
  '@store/actions': 'src/app/store/actions',
  '@store/interfaces': 'src/app/store/interfaces',
  '@store/reducers': 'src/app/store/reducers',
  '@types': 'src/app/domain/types',
  '@utils': 'src/app/utils',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)