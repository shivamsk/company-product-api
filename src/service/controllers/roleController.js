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

      console.log("#######Role Controller : " + JSON.stringify(req));

      const newRole = await this.RoleRepository.create(req.body);
      this.httpCreated(res, Object.assign({}, newRole.toJSON()));
    } catch (error) {

      this.httpInternalServerError(res, error);
    }
  }


}

export default RoleController;

