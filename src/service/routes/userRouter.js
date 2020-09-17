import BaseRouter from './baseRouter';
//import { authenticated } from '../middleware/middleware-security';

class UserRouter extends BaseRouter {
  constructor(userController) {
    super(userController);
    //  this.Router.use(authenticated());

    this.Router.route('/ad')
        .get(async (req, res) => this.Controller.helloWorld(req, res));

    this.Router.route('/')
        .post(async (req, res) => {
          console.log("#######USER Router : " + JSON.stringify(req.body));

          const response = await this.Controller.create(req, res);
          return response;
        });

    this.Router.route('/signin')
        .post(async (req, res) => this.Controller.signIn(req, res));


    this.Router.route('/protected')
        .post(async (req, res) => this.Controller.protectedResource(req, res));

  }
}

export default UserRouter;