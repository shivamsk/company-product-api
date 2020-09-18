import ApiController from './apiController';

class RoleController extends ApiController {
  constructor(roleRepository, logger) {
    super();
    this._roleRepository = roleRepository;
    this._logger = logger;
  }

  get RoleRepository() {
    return this._roleRepository;
  }


  async create(req, res) {
    try {

      console.log("#######Role Controller : " + req);

      const role = await this._roleRepository.create(req.body);
      this.httpCreated(res, Object.assign({}, role.toJSON()));
    } catch (error) {

      this.httpInternalServerError(res, error.message);
    }
  }


}

export default RoleController;

