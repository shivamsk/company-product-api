import ApiController from './apiController';

class ProductController extends ApiController {
  constructor(productRepository, logger) {
    super();
    this._productRepository = productRepository;
    this._logger = logger;
  }

  get ProductRepository() {
    return this._productRepository;
  }


  async create(req, res) {
    try {

      //console.log("#######Product Controller : " + JSON.stringify(req));

      const newProduct = await this._productRepository.create(req.body);
      this.httpCreated(res, Object.assign({}, newProduct.toJSON()));
    } catch (error) {

      this.httpInternalServerError(res, error.message);
    }
  }


}

export default ProductController;

