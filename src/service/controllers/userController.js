import ApiController from './apiController';
import { getToken } from '../middleware/middlewarePassport';

class UserController extends ApiController {
  constructor(userRepository, logger) {
    super();
    this._userRepository = userRepository;
    this._logger = logger;
  }

  get UserRepository() {
    return this._userRepository;
  }

  async create(req, res) {
    try {
      console.log(`#######USER Controller : ${req}`);

      const newUser = await this._userRepository.create(req.body);
      this.httpCreated(res, { ...newUser.toJSON(), password: null });
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }

  async signIn(req, res) {
    try {
      console.log(`#######USER Signin : ${JSON.stringify(req.body)}`);

      const user = await this.UserRepository.findOne({ userName: req.body.userName });
      console.log(`##########UserSignin${JSON.stringify(user)}`);

      if (user && (user.isActive === true) && (user.password === req.body.password)) {
        const token = getToken(user);
        this.httpOk(res, { ...user.toJSON(), token, password: null });
      } else {
        // this.httpNotFound(res, 'User not active/registered/wrong password');
        throw new Error('User wrong password');
      }
    } catch (error) {
      this.httpInternalServerError(res, error);
      // throw error;
    }
  }

  async helloWorld(req, res) {
    console.log('Hello Test');
    const newUser = { hello: 'HELLO HELLO WORLD' };
    this.httpCreated(res, newUser, { password: null });
  }

  async protectedResource(req, res) {
    console.log('Hello Test');
    const newUser = { hello: 'HELLO HELLO WORLD' };
    this.httpCreated(res, newUser, { password: null });
  }
}

export default UserController;
