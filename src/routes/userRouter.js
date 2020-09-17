import BaseRouter from './baseRouter';
//import { authenticated } from '../middleware/middleware-security';

class UserRouter extends BaseRouter {
  constructor (
    userController
  ) {
    super(userController);
    //  this.Router.use(authenticated());

    this.Router.route('/')
      .get(async (req, res) => this.Controller.helloWorld(req, res));

  }
}

export default UserRouter;