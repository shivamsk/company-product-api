import BaseRouter from './baseRouter';

class RoleRouter extends BaseRouter {
  constructor(roleController) {
    super(roleController);

    this.Router.route('/')
      .post(async (req, res) => this.Controller.create(req, res));
  }
}
export default RoleRouter;
