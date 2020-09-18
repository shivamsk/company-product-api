import BaseRouter from './baseRouter';

class CategoryRouter extends BaseRouter {
  constructor(categoryController) {
    super(categoryController);

    this.Router.route('/')
      .post(async (req, res) => {
        const response = await this.Controller.create(req, res);
        return response;
      });
  }
}
export default CategoryRouter;
