import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import securityConfiguration from '../../../config/development/security.json';

export default function (app, userRepository, securityConfig) {
  passport.use(new JWTStrategy({
    secretOrKey: securityConfig.jwt.secret,
    issuer: securityConfig.jwt.issuer,
    audience: securityConfig.jwt.audience,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }, async (token, done) => {
    try {
      const user = await userRepository.findOne({ userName: token.sub });

      if (user && (user.isActive === true)) {
        done(null, user);
      } else {
        done('User not active/registered', false);
      }
    } catch (err) {
      done(err, false);
    }
  }));
  app.use(passport.initialize());
}

export const getToken = (user) => {
  const payload = {
    sub: user.userName,
    name: user.name,
    iss: 'one-identity',
    aud: 'audience-core',
    role: user.role,
  };
  const token = jwt.sign(payload, securityConfiguration.jwt.secret);
  return token;
};
