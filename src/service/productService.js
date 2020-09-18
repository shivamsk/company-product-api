class ProductService {

  constructor(productRepository) {
    this._productRepository = productRepository;
  }

  async getProducts(req) {

    let query = {
      sellerId: req.user._id,
      isDeleted: false
    };
    if (req.query && req.query.page) {
      let perPage = 2;
      let page = req.query.page > 0 ? req.query.page : 0;


      // req.params.sellerId = req.user._id;
      const products = await this._productRepository.getByPage({
        sellerId: req.user._id,
        isDeleted: false
      }, 'name', perPage * page, perPage);


      return products;
    } else if (req.query && req.query.category) {
      query.category = req.query.category;
      const products = await this._productRepository.getWithParent(query,"category","name -_id");
      return products;

    }


    else if (req.params) {
      let product = {};
      const query = {
        sellerId: req.user._id,
        isDeleted: false,
      }
      if (req.params.productId) {
        query._id = req.params.productId;

      } else if (req.params.category) {
        query.category = req.params.category;
        product = await this._productRepository.getWithParent(query,"category","name -_id");
      }
      // req.params.sellerId = req.user._id;
      // req.params.isDeleted = false;
      // req.params._id = req.params.productId;

      return product;
    }

    return [];

  }
}

export default ProductService;
