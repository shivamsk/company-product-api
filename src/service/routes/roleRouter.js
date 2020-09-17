import BaseRouter from './baseRouter';
//import { authenticated } from '../middleware/middleware-security';

class RoleRouter extends BaseRouter {
  constructor (

      roleController
  ) {
    super(roleController);


    this.Router.route('/')
        .post(async (req, res) => {
          console.log("#######Role Router : " + JSON.stringify(req.body));

          const response = await this.Controller.create(req, res);
          return response;
        });

  }
}

export default RoleRouter;