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
            next();
            // res.send({ message: "Successful" });
          }
        }
      )
}

exports.getUserInfo = (req,res,next) => {
  console.log("---------------------------userinfo----------------------------")
  console.log(req.user)
  if(req.user)
  res.send(req.user)
  else
  res.send({})
  res.status(200).end()
}

exports.postlogin = (err, req, res, next) => {
    if (err) next(err);
  }

exports.loginFailure = (req, res, next) => {
    console.log(req.session);
    res.send({message:'Login Attempt Failed.'});
  }

exports.loginSuccess =  (req, res, next) => {
    console.log(req.session);
    console.log(req.cookies)
    res.send({success:'Login Attempt was successful.'});
    res.status(200).end()
  }

exports.userSearch = async (req,res,next) => {
  console.log(req.cookies)
  console.log(req.session)
  let result = await User.find({email:req.query.email})
  res.send(result)
  res.status(200).end()
  console.log(result)
}

exports.checkAuth = async (req,res,next) => {
  allowedRoutes = ['login','register','landingPage']
  protectedRoute = ['home']
  debugger
  if(req.user == undefined && protectedRoute.includes(req.query.route))
  {
    res.send({redirectTo:'login'})
    res.status(200).end()  

  }
  else if(req.user!=undefined && allowedRoutes.includes(req.query.route))
  {
    res.send({redirectTo:'home'})
    res.status(200).end()  

  }
  else
  {
    res.send({redirectTo:''})
  }
}

exports.logout = async (req,res,next) => {
  console.log(req.cookies)
 await req.logout(function(err)
  {
    if(err)
    {
      console.log(err)
    }
  });
  res.clearCookie("connect.sid", {path:"/",httpOnly:true})
  res.status(200).end()  
}