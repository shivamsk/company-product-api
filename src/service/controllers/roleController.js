import ApiController from './apiController';

class RoleController extends ApiController {
  constructor(roleRepository, logger) {
    super();
    this.roleRepository = roleRepository;
    this.logger = logger;
  }

  get RoleRepository() {
    return this.roleRepository;
  }

  async create(req, res) {
    try {
      this.logger.info(`RoleController : ${req}`);

      const role = await this.roleRepository.create(req.body);
      this.httpCreated(res, { ...role.toJSON() });
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }
}

export default RoleController;
