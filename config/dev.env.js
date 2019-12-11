const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  ROOT_API: '192.168.43.115',
  ROOT_PORT: 8000
})