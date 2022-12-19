const User = require('../models/user-model');

const userController = {};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if(username === undefined || password === undefined){
    return next({
      log: 'userController.verifyUser: ERROR: Missing info',
      message: {
        err: 'missing info'
      }
    });
  }

  try {
    const user = await User.findOne({ username });

    if(user.password !== password) throw new Error();

    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: 'userController.verifyUser: ERROR: wrong info',
      message: {
        err: 'wrong info'
      }
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;

  const credentials = { email, username, password };

  if(Object.keys(credentials).some(key => credentials[key] === undefined)) {
    return next({
      log: 'userController.createUser: ERROR: Missing essential info',
      message: {
        err: 'missing essential info'
      }
    })
  }

  credentials.firstName = firstName;
  credentials.lastName = lastName;

  try { 
    const user = await User.create(credentials);
    res.locals.user = user;
    return next();
  } catch (error) {
    return next(error)
  }
};

module.exports = userController;