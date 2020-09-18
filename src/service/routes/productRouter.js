import BaseRouter from './baseRouter';
import { ROLES } from '../../common/constants/roles';
import { authenticated, checkIsInRole } from '../middleware/middlewareSecurity';

class ProductRouter extends BaseRouter {
  constructor(productController) {
    super(productController);

    this.Router.route('/')
      .post(async (req, res) => {
        console.log(`#######Product Router : ${JSON.stringify(req.body)}`);

        console.log(`#######Product User : ${JSON.stringify(req.user)}`);

        const response = await this.Controller.create(req, res);
        return response;
      });

    this.Router.route('/')
      .get(async (req, res) => {
        console.log(`#######Product Router : ${JSON.stringify(req.body)}`);

        console.log(`#######Product User : ${JSON.stringify(req.user)}`);

        const response = await this.Controller.get(req, res);
        return response;
      });

    this.Router.route('/:productId')
      .get(async (req, res) => {
        console.log(`#######Product Router : ${JSON.stringify(req.body)}`);

        console.log(`#######Product User : ${JSON.stringify(req.user)}`);

        const response = await this.Controller.getById(req, res);
        return response;
      });

    this.Router.route('/:productId').all(checkIsInRole(ROLES.ADMIN,
        ROLES.CUSTOMER))
      .put(async (req, res) => {
        console.log(`$$$$$$$Product Update : ${JSON.stringify(req.body)}`);

        console.log(`#######Product User : ${JSON.stringify(req.user)}`);
        console.log(`#######Product User : ${JSON.stringify(req.params)}`);

        const response = await this.Controller.put(req, res);
        return response;
      });

    this.Router.route('/:productId').all(checkIsInRole(ROLES.ADMIN))
      .delete(async (req, res) => {
        const response = await this.Controller.delete(req, res);
        return response;
      });
  }
}
export default ProductRouter;
