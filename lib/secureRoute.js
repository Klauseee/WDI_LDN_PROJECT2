function secureRoute(req, res, next) {
  // if the user is not logged in, they are redirected to the login page (if they are trying to perform an action reserved for users)
  if(!req.session.userId){
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to do that.');
      res.redirect('/login');
    });
  }
  next();
}

module.exports = secureRoute;
