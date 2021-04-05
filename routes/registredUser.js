const Router = require('express').Router,
      RegistrationController = require('./../controllers/registration.js'),
      LoginController = require('./../controllers/login.js');

const router = Router();

router.route('/registration')
    .post((req, resp) => {
      RegistrationController.post_registration(req, resp);
    });

router.route('/')
    .get((req, resp) => {
      LoginController.get_login(req, resp);
    })

module.exports = router;
