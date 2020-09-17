import ApiController from './apiController';


class ProductController extends ApiController {
  constructor(productRepository, productService, logger) {
    super();
    this._productRepository = productRepository;
    this._productService = productService;
    this._logger = logger;
  }

  get ProductRepository() {
    return this._productRepository;
  }

  get Logger() {
    return this._logger;
  }


  async create(req, res) {
    try {

      req.body.sellerId = req.user._id;
      req.body.isDeleted = false;
      const newProduct = await this._productRepository.create(req.body);
      this.httpCreated(res, newProduct.toJSON());
    } catch (error) {

      this.httpInternalServerError(res, error);
    }
  }

  async get(req, res) {
    try {

      // console.log("#######Product Params : " + JSON.stringify(req.params));
      this.Logger.info("Using Logger#######Product Params : " + JSON.stringify(req.params));
      //const products = await this._productRepository.get({sellerId: req.user._id});
      const products = await this._productService.getProducts(req);
      this.httpOk(res, products);
    } catch (error) {
      console.log("#######Error " + error);
      this.httpInternalServerError(res, error);
    }
  }

  async getById(req, res) {
    try {

      console.log("#######Product Params : " + JSON.stringify(req.params));

      //const products = await this._productRepository.get({sellerId: req.user._id});
      const product = await this._productService.getProducts(req);
      console.log("Product Found " + typeof (product));
      if (!product) {
        this.httpNotFound(res, product);
      }
      this.httpNotFound(res, product);
    } catch (error) {
      console.log("#######Error " + error);
      this.httpInternalServerError(res, error);
    }
  }

  async put(req, res) {
    try {

      console.log("#######Product Update : " + JSON.stringify(req.user));

      console.log("#######Product Params : " + JSON.stringify(req.params));

      let updatedProduct = await this._productRepository.upsert({
            _id: req.params.productId,
            isDeleted: false
          },
          req.body);
      console.log("#######updatedProduct : " + updatedProduct);

      this.httpOk(res, updatedProduct);
    } catch (error) {
      console.log("#######Error " + error);
      this.httpInternalServerError(res, error);
    }
  }

  async delete(req, res) {
    try {
      let updatedProduct = await this._productRepository.upsert({_id: req.params.productId},
          {isDeleted: true});
      console.log("#######updatedProduct : " + updatedProduct);

      this.httpOk(res, updatedProduct);
    } catch (error) {
      console.log("#######Error " + error);
      this.httpInternalServerError(res, error);
    }
  }


}

export default ProductController;

