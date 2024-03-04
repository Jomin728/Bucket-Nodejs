const User = require('../models/user');

exports.register = (req,res,next) => {
    User.register(
        new User({ 
          email: req.body.email, 
          username: req.body.username 
        }), req.body.password, function (err, msg) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successful" });
          }
        }
      )
}

exports.postlogin = (err, req, res, next) => {
    if (err) next(err);
  }

exports.loginFailure = (req, res, next) => {
    console.log(req.session);
    res.send('Login Attempt Failed.');
  }

exports.loginSuccess =  (req, res, next) => {
    console.log(req.session);
    res.send('Login Attempt was successful.');
  }

exports.userSearch = async (req,res,next) => {
  console.log(req.query)
  let result = await User.find({email:req.query.email})
  res.send(result)
  res.status(200).end()
  console.log(result)
}