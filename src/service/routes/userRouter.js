import BaseRouter from './baseRouter';
import { authenticated, checkIsInRole } from '../middleware/middlewareSecurity';
import { ROLES } from '../../common/constants/roles';

class UserRouter extends BaseRouter {
  constructor(userController) {
    super(userController);

    this.Router.route('/')
      .post(async (req, res) => {
        console.log(`#######USER Router : ${JSON.stringify(req.body)}`);

        const response = await this.Controller.create(req, res);
        return response;
      });

    this.Router.route('/signin')
      .post(async (req, res) => this.Controller.signIn(req, res));

    this.Router.route('/protected').all(authenticated(), checkIsInRole(ROLES.ADMIN))
      .get(async (req, res) => this.Controller.protectedResource(req, res));
  }
}

export default UserRouter;
