import passport from 'passport';
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';
import jwt from 'jsonwebtoken';

export default function (app, userRepository, securityConfig) {
  passport.use(new JWTStrategy({
    secretOrKey: securityConfig.jwt.secret,
    issuer: securityConfig.jwt.issuer,
    audience: securityConfig.jwt.audience,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      console.log("##########JWTStrategy " + JSON.stringify(token));

      const user = await userRepository.findOne({userName: token.sub});

      console.log("##########UserByUserName" + JSON.stringify(token));


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
    aud: 'stringbees-core'
  };
  const token = jwt.sign(payload, 'stringbees-secret');
  return token;
};