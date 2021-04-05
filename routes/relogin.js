const Router = require('express').Router,
      LoginController = require('./../controllers/login.js');

const router = Router();

router.route('/relogin')
    .get((req, resp) => {
      LoginController.get_relogin(req, resp);
    });

module.exports = router;
