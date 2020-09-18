import passport from 'passport';

export function authenticated() {
  return passport.authenticate('jwt', { session: false });
}

export const checkIsInRole = (...roles) => (req, res, next) => {
  console.log(`checkIsInRole ${JSON.stringify(req.user)}`);
  if (!req.user) {
    return res.status(401).json({
      messsage: 'Invalid Credentials',
    });
  }
  const hasRole = roles.find((role) => req.user.role === role);
  if (!hasRole) {
    return res.status(403).json({
      messsage: 'User does not have access to this API',
    });
  }

  return next();
};
