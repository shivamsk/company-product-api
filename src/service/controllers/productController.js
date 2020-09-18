import ApiController from './apiController';

class ProductController extends ApiController {
  constructor(productRepository, productService, logger) {
    super();
    this.productRepository = productRepository;
    this.productService = productService;
    this.logger = logger;
  }

  get ProductRepository() {
    return this.productRepository;
  }

  get Logger() {
    return this.logger;
  }

  async create(req, res) {
    try {
      req.body.sellerId = req.user._id;
      req.body.isDeleted = false;
      req.body.productId = req.body.name;

      const newProduct = await this.productRepository.create(req.body);
      this.httpCreated(res, newProduct.toJSON());
    } catch (error) {
      this.httpInternalServerError(res, error);
    }
  }

  async get(req, res) {
    try {
      this.Logger.info('Using Logger#######Product Params : ', req.params);
      const products = await this.productService.getProducts(req);
      this.httpOk(res, products);
    } catch (error) {
      console.log(`#######Error ${error}`);
      this.Logger.info(`#######Error ${error}`);

      this.httpInternalServerError(res, error);
    }
  }

  async getById(req, res) {
    try {
      console.log(`#######Product Params : ${JSON.stringify(req.params)}`);
      const product = await this.productService.getProducts(req);
      console.log(`Product Found ${typeof (product)}`);
      if (!product) {
        this.httpNotFound(res, product);
      }
      this.httpNotFound(res, product);
    } catch (error) {
      console.log(`#######Error ${error}`);
      this.httpInternalServerError(res, error);
    }
  }

  async put(req, res) {
    try {
      console.log(`#######Product Update : ${JSON.stringify(req.user)}`);

      console.log(`#######Product Params : ${JSON.stringify(req.params)}`);

      const query = {
        _id: req.params.productId,
        isDeleted: false,
      };

      if (req.body.categoryId) {
        req.body.category = req.body.categoryId;
      }
      const updatedProduct = await this.productRepository.upsert({
        _id: req.params.productId,
        isDeleted: false,
      },
      req.body);
      console.log(`#######updatedProduct : ${updatedProduct}`);

      this.httpOk(res, updatedProduct);
    } catch (error) {
      console.log(`#######Error ${error}`);
      this.httpInternalServerError(res, error);
    }
  }

  async delete(req, res) {
    try {
      const updatedProduct = await this.productRepository.upsert({ _id: req.params.productId },
        { isDeleted: true });
      console.log(`#######updatedProduct : ${updatedProduct}`);

      this.httpOk(res, updatedProduct);
    } catch (error) {
      console.log(`#######Error ${error}`);
      this.httpInternalServerError(res, error);
    }
  }
}

export default ProductController;
