const dev = require('./dev');
const prod = require('./prod');

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV == 'dev'){
  module.exports = exports = {
    env: dev
  }
} else if(process.env.NODE_ENV == 'prod'){
  module.exports = exports = {
    env: prod
  }
}
