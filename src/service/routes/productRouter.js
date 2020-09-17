import BaseRouter from './baseRouter';

class ProductRouter extends BaseRouter {
  constructor(productController) {
    super(productController);

    this.Router.route('/')
        .post(async (req, res) => {
          console.log("#######Product Router : " + JSON.stringify(req.body));

          const response = await this.Controller.create(req, res);
          return response;
        });


  }
}
export default ProductRouter;