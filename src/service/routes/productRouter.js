import BaseRouter from './baseRouter';
//https://madhums.me/2012/08/20/pagination-using-mongoose-express-and-jade/
class ProductRouter extends BaseRouter {
  constructor(productController) {
    super(productController);

    this.Router.route('/')
        .post(async (req, res) => {
          console.log("#######Product Router : " + JSON.stringify(req.body));

          console.log("#######Product User : " + JSON.stringify(req.user));

          const response = await this.Controller.create(req, res);
          return response;
        });

    this.Router.route('/')
        .get(async (req, res) => {
          console.log("#######Product Router : " + JSON.stringify(req.body));

          console.log("#######Product User : " + JSON.stringify(req.user));

          const response = await this.Controller.get(req, res);
          return response;
        });

    this.Router.route('/:productId')
        .get(async (req, res) => {
          console.log("#######Product Router : " + JSON.stringify(req.body));

          console.log("#######Product User : " + JSON.stringify(req.user));

          const response = await this.Controller.getById(req, res);
          return response;
        });

    this.Router.route('/:productId')
        .put(async (req, res) => {
          console.log("#######Product Router : " + JSON.stringify(req.body));

          console.log("#######Product User : " + JSON.stringify(req.user));
          console.log("#######Product User : " + JSON.stringify(req.params));


          const response = await this.Controller.put(req, res);
          return response;
        });

    this.Router.route('/:productId')
        .delete(async (req, res) => {


          const response = await this.Controller.delete(req, res);
          return response;
        });


  }
}
export default ProductRouter;