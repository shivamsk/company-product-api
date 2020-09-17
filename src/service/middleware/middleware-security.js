import passport from 'passport';


export function authenticated() {
  return passport.authenticate('jwt', {session: false});
}

export const checkIsInRole = (...roles) => (req, res, next) => {

  console.log("checkIsInRole "  + JSON.stringify(req.user));
  if (!req.user) {
    console.log("No Role Specified");
    throw new Error("No Role Specified");
  }

  console.log(" ROles " + roles);
  const hasRole = roles.find(role => req.user.role === role)
  if (!hasRole) {
    console.log("User has no Role");

    // return new Error("No Role Specified");
    return res.send("You need to sign in ");
  }

  return next()
}
