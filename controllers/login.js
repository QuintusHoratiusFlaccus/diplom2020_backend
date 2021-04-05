const ProfileModel = require('./../models/profileModel.js'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');

class LoginController{
    async get_login(req, resp){
      const body = req.query;

      const loginExist = await ProfileModel.findOne({email: body.login});

      if(loginExist) {
        if(bcrypt.compareSync(body.password, loginExist.password)){
          let token = jwt.sign({id: loginExist._id}, 'knrwirbpm');
          resp.setHeader(`auth`, `Barear ${token}`);
          delete loginExist.password;
          resp.status(201).json(loginExist);
        } else {
          resp.status(409).json({message: 'Password or login is incorrect.'});
        }
      } else {
        resp.status(409).json({message: 'Password or login is incorrect.'});
      }
    }

    get_relogin(req, resp){
      const user = req.user;

      resp.status(201).json(user);
    }

  }

module.exports = new LoginController();
