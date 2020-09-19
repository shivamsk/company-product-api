import ApiController from './apiController';
import { getToken } from '../middleware/middlewarePassport';

class UserController extends ApiController {
  constructor(userRepository, logger) {
    super();
    this.userRepository = userRepository;
    this.logger = logger;
  }

  get UserRepository() {
    return this.userRepository;
  }

  async create(req, res) {
    try {
      this.logger.info(`UserController : ${req}`);
      if (!req.body.userName || !req.body.password) {
        return this.httpBadRequest(res, {
          message: 'Username or Password not provided',
        });
      }

      if (req.body.userName.length < 6 || req.body.password.length < 6) {
        return this.httpBadRequest(res, {
          message: 'Username and Password should have minimum 6 characters',
        });
      }

      const user = await this.userRepository.findOne({ userName: req.body.userName });
      this.logger.info(`User : ${JSON.stringify(user)}`);

      if (user) {
        return this.httpBadRequest(res, {
          message: 'userName already taken. Please user another userName',
        });
      }
      const newUser = await this.userRepository.create(req.body);
      return this.httpCreated(res, { ...newUser.toJSON(), password: null });
    } catch (error) {
      this.logger.error(`error : ${error}`);
      this.httpInternalServerError(res, error.message);
    }
  }

  async signIn(req, res) {
    try {
      this.logger.info(`UserController : ${JSON.stringify(req.body)}`);

      if (!req.body.userName || !req.body.password) {
        return this.httpBadRequest(res, {
          message: 'Username or Password not provided',
        });
      }
      const user = await this.UserRepository.findOne({ userName: req.body.userName });
      this.logger.info(`User : ${user}`);

      if (user && (user.isActive === true) && (user.password === req.body.password)) {
        const token = getToken(user);
        return this.httpOk(res, { ...user.toJSON(), token, password: null });
      }

      this.logger.info('Came here ');
      return this.httpUnauthorized(res, {
        message: 'User not active/registered/wrong password',
      });
    } catch (error) {
      this.logger.error(`error : ${error}`);
      this.httpInternalServerError(res, error);
    }
  }
}

export default UserController;
