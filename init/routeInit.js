const user_registration = require('./../routes/registredUser.js');
const relogin = require('./../routes/relogin.js');
const checkAuthMiddleware = require('./../middleware/checkAuth.js');

const route_init = (app, base_url) => {
  app.use(base_url, user_registration);
  app.use(base_url, checkAuthMiddleware.checkAuth, relogin);
  // app.use(base_url + '/admin', auth_middleware.checkAuth, admin_panel_router);
  // app.use(base_url, site);
}

module.exports = route_init;
