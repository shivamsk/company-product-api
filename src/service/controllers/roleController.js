import ApiController from './apiController';

class RoleController extends ApiController {
  constructor(roleRepository, logger) {
    super();
    this._roleRepository = roleRepository;
    this._logger = logger;
  }

  get ProductRepository() {
    return this._productRepository;
  }


  async create(req, res) {
    try {

      console.log("#######Role Controller : " + req);

      const newProduct = await this._roleRepository.create(req.body);
      this.httpCreated(res, Object.assign({}, newProduct.toJSON()));
    } catch (error) {

      this.httpInternalServerError(res, error.message);
    }
  }


}

export default RoleController;

