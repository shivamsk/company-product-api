import ApiController from './apiController';

class CategoryController extends ApiController {
  constructor(categoryRepository, logger) {
    super();
    this.categoryRepository = categoryRepository;
    this._logger = logger;
  }

  get CategoryRepository() {
    return this.categoryRepository;
  }


  async create(req, res) {
    try {

      const newCategory = await this.categoryRepository.create(req.body);
      this.httpCreated(res, Object.assign({}, newCategory.toJSON()));
    } catch (error) {

      this.httpInternalServerError(res, error.message);
    }
  }


}

export default CategoryController;

