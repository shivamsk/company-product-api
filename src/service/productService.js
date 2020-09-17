class ProductService {

  constructor(productRepository) {
    this._productRepository = productRepository;
  }

  async getProducts(req) {

    if (req.query && req.query.page) {
      let perPage = 2;
      let page = req.query.page > 0 ? req.query.page : 0;

      // req.params.sellerId = req.user._id;
      const products = await this._productRepository.getByPage({
        sellerId: req.user._id,
        isDeleted: false
      }, 'name', perPage * page, perPage);


      return products;
    } else if (req.params) {
      const query = {
        sellerId: req.user._id,
        isDeleted: false,
        _id: req.params.productId,
      }
      // req.params.sellerId = req.user._id;
      // req.params.isDeleted = false;
      // req.params._id = req.params.productId;
      const product = await this._productRepository.get(query);

      return product;
    }

    return [];

  }
}

export default ProductService;
