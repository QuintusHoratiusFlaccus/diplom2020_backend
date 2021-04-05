const ProfileModel = require('./../models/profileModel.js'),
      bcrypt = require('bcrypt');

class RegistrationController{
      async post_registration(req, resp){
        const body = req.body,
              profile = new ProfileModel({
                ...body,
                password: bcrypt.hashSync(body.password, 2)
              });
        const profileTaken = await ProfileModel.findOne({email: body.email});
        if(profileTaken){
          resp.status(409).json({message: 'User with this email already exist.'});
          return;
        }
        // if(profile.password !== profile.passwordConfirm){
        //   resp.status(409).json({message: 'Passwords doesn\'t equal.'});
        //   return;
        // }
        if(profile.validateSync()) {
          resp.status(409).json(profile.validateSync());
          return;
        }

        await profile.save();
        await ProfileModel.findOneAndUpdate({_id: profile._id}, {$unset: {passwordConfirm: ''}});
        resp.status(201).json({message: 'success'})
      }
 }

module.exports = new RegistrationController();
