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

  async create(req, res) {
    try {
      this.logger.info(`ProductController : ${JSON.stringify(req.body)}`);

      if (!req.body.name || !req.body.categoryId) {
        return this.httpBadRequest(res, {
          message: 'name or categoryId is missing',
        });
      }

      const requestBody = req.body;

      // eslint-disable-next-line
      requestBody.sellerId = req.user._id;
      requestBody.productId = req.body.name;
      requestBody.isDeleted = false;
      requestBody.category = req.body.categoryId;

      const newProduct = await this.productRepository.create(req.body);
      this.httpCreated(res, newProduct.toJSON());
    } catch (error) {
      this.httpInternalServerError(res, error);
    }
  }

  async get(req, res) {
    try {
      this.logger.info(`ProductController : ${JSON.stringify(req.query)}`);
      const products = await this.productService.getProductsByQueryParam(req);
      this.httpOk(res, products);
    } catch (error) {
      this.logger.error(`error : ${error}`);
      this.httpInternalServerError(res, error);
    }
  }

  async getById(req, res) {
    try {
      this.logger.info(`ProductController Params: ${JSON.stringify(req.params)}`);
      const product = await this.productService.getProductsByPathParam(req);
      if (!product) {
        return this.httpNotFound(res, {
          message: `Product not found for the id : ${req.params.productId}`,
        });
      }
      this.httpOk(res, product);
    } catch (error) {
      this.logger.error(`error : ${error}`);
      this.httpInternalServerError(res, error);
    }
  }

  async put(req, res) {
    try {
      this.logger.info(`ProductController : ${JSON.stringify(req.params)}`);

      if (!req.params.productId) {
        return this.httpBadRequest(res, {
          message: 'productId is missing',
        });
      }

      const product = await this.productService.findProduct(req);
      if (!product) {
        return this.httpNotFound(res, {
          message: `Product not found for the id : ${req.params.productId}`,
        });
      }
      const requestBody = req.body;

      if (req.body.categoryId) {
        requestBody.category = req.body.categoryId;
      }

      const updatedProduct = await this.productRepository.upsert({
        _id: req.params.productId,
        sellerId: req.user._id,
        isDeleted: false,
      }, req.body);
      this.logger.info(`updatedProduct : ${updatedProduct}`);

      this.httpOk(res, updatedProduct);
    } catch (error) {
      this.logger.error(`error : ${error}`);
      this.httpInternalServerError(res, error);
    }
  }

  async delete(req, res) {
    try {
      this.logger.info(`ProductController : ${req.params}`);
      const product = await this.productService.findProduct(req);
      if (!product) {
        return this.httpNotFound(res, {
          message: `Product not found for the id : ${req.params.productId}`,
        });
      }
      const updatedProduct = await this.productRepository.upsert({
        _id: req.params.productId,
        sellerId: req.user._id,
      },
      { isDeleted: true });
      this.logger.info(`DeletedProduct : ${updatedProduct}`);

      this.httpOk(res, updatedProduct);
    } catch (error) {
      this.logger.error(`error : ${error}`);
      this.httpInternalServerError(res, error);
    }
  }
}

export default ProductController;
