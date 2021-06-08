module.exports = function (config) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.filter(rule => rule.loader !== 'babel-loader'),
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          options: {
            plugins: [
              ['import', {
                'libraryName': 'antd',
                'libraryDirectory': 'es'
              }],
              // ['babel-plugin-import', {
              //   'libraryName': 'antd',
              //   'libraryDirectory': 'es'
              // }],
            ]
          },
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
        // override default sass rule to ignore executing when used for sass imports in less files (sounds weird)
        {
          test: /\.scss$/,
          issuer: {
            exclude: /\.less$/,
          },
        },
        // convert sass variables to less variables
        {
          test: /\.scss$/,
          issuer: /\.less$/,
          use: {
            loader: './sassVarsToLess.js'
          }
        },
      ],
    },
  };
}