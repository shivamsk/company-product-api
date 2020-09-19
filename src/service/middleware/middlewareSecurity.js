import passport from 'passport';

export function authenticated() {
  return passport.authenticate('jwt', { session: false });
}

export const checkIsInRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Invalid Credentials',
    });
  }
  const hasRole = roles.find((role) => req.user.role === role);
  if (!hasRole) {
    return res.status(403).json({
      message: 'User does not have role to access this API',
    });
  }

  return next();
};
