import passport from 'passport';

export function authenticated () {
  console.log("##########authenticated Use");

  return passport.authenticate('jwt', { session: false });
}