class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getProductsByQueryParam(req) {

    const query = {
      // eslint-disable-next-line
      sellerId: req.user._id,
      isDeleted: false,
    };

    if (req.query && req.query.categoryId) {
      query.category = req.query.categoryId;
      const products = await this.productRepository.getWithParent(query, 'category', 'name -_id');
      return products;
    }

    if (req.query) {
      const perPage = 10;
      const page = req.query.page > 0 ? req.query.page : 0;
      const products = await this.productRepository.getByPageWithParent({
        // eslint-disable-next-line
        sellerId: req.user._id,
        isDeleted: false,
      }, 'name', perPage * page, perPage, 'category', 'name -_id');

      return products;
    }

    return [];
  }

  async getProductsByPathParam(req) {
    const query = {
      // eslint-disable-next-line
      sellerId: req.user._id,
      isDeleted: false,
    };

    if (req.params) {
      if (req.params.productId) {
        // eslint-disable-next-line
        query._id = req.params.productId;
      }
      // eslint-disable-next-line
      // const product = await this.productRepository.getWithParent(query,
      //     'category', 'name -_id');
      const product = await this.productRepository.getByPageWithParent(query,
          'name', 0, 1, 'category', 'name -_id');

      return product;
    }

    return null;
  }

  async findProduct(req) {
    const query = {
      // eslint-disable-next-line
      sellerId: req.user._id,
      isDeleted: false,
      // eslint-disable-next-line
      _id: req.params.productId
    };
    const product = await this.productRepository.findOne(query);
    return product;
  }
}

export default ProductService;
