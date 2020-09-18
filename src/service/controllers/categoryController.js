import ApiController from './apiController';

class CategoryController extends ApiController {
  constructor(categoryRepository, logger) {
    super();
    this.categoryRepository = categoryRepository;
    this.logger = logger;
  }

  get CategoryRepository() {
    return this.categoryRepository;
  }

  async create(req, res) {
    try {
      const newCategory = await this.categoryRepository.create(req.body);
      this.httpCreated(res, { ...newCategory.toJSON() });
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }
}

export default CategoryController;
