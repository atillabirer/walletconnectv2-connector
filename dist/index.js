
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./walletconnectv2-connector.cjs.production.min.js')
} else {
  module.exports = require('./walletconnectv2-connector.cjs.development.js')
}
