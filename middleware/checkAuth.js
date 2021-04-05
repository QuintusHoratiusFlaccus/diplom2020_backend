const jwt = require('jsonwebtoken');
const ProfileModel = require('./../models/profileModel.js');

class CheckAuthMiddleware{
  checkAuth(req, resp, next){
    if(!req.headers.auth){
      resp.status(401).json({message: 'You are not authorized.'});
      return;
    }
    jwt.verify(req.headers.auth.split(' ')[1], 'knrwirbpm', async (error, data) => {
      if(error) resp.status(401).json(error);
      let user = await ProfileModel.findOne({_id: data.id});
      req.user = user;
      next();
    })
  }
}

module.exports = new CheckAuthMiddleware();
