
//Require all controllers
const Controllers = require('../controllers');

const homeController = Controllers.home;

module.exports = exports = (app) => {
  app.set('views', './src/views');
  app.set('view engine', "pug");

  app.get('/home', homeController.render);

}
