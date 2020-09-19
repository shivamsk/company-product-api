import BaseRouter from './baseRouter';
import { authenticated, checkIsInRole } from '../middleware/middlewareSecurity';
import { ROLES } from '../../common/constants/roles';

class UserRouter extends BaseRouter {
  constructor(userController) {
    super(userController);

    this.Router.route('/')
      .post(async (req, res) => this.Controller.create(req, res));

    this.Router.route('/signin')
      .post(async (req, res) => this.Controller.signIn(req, res));
  }
}

export default UserRouter;
