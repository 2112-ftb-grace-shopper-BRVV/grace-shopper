//when request is made it checks if there is an authenticated user behind the request!
function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action",
      });
    }
  
    next();
  }
  
  module.exports = {
    requireUser,
  };

  //added for user auth later on 
  