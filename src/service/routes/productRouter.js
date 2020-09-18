import BaseRouter from './baseRouter';
import { ROLES } from '../../common/constants/roles';
import { checkIsInRole } from '../middleware/middlewareSecurity';

class ProductRouter extends BaseRouter {
  constructor(productController) {
    super(productController);

    this.Router.route('/')
      .post(async (req, res) => this.Controller.create(req, res));

    this.Router.route('/')
      .get(async (req, res) => this.Controller.get(req, res));

    this.Router.route('/:productId')
      .get(async (req, res) => this.Controller.getById(req, res));

    this.Router.route('/:productId').all(checkIsInRole(ROLES.ADMIN, ROLES.CUSTOMER))
      .put(async (req, res) => this.Controller.put(req, res));

    this.Router.route('/:productId').all(checkIsInRole(ROLES.ADMIN))
      .delete(async (req, res) => this.Controller.delete(req, res));
  }
}

export default ProductRouter;
