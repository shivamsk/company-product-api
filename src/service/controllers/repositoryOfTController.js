import ApiController from './apiController';

class RepositoryOfTController extends ApiController {
  constructor(repositoryOfT) {
    super();
    this.repositoryOfT = repositoryOfT;
  }

  get Repository() {
    return this.repositoryOfT;
  }

  async get(req, res) {
    try {
      const entities = await this.Repository.get(req.query);
      this.httpOk(res, entities);
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }

  getById(req, res) {
    this.httpOk(res, req.entity);
  }

  async post(req, res) {
    const newEntity = new this.Repository.Model(req.body);
    try {
      await this.Repository.create(newEntity);
      this.httpCreated(res, newEntity);
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }

  async put(req, res) {
    try {
      const updatedEntity = await this.Repository.update(req.entity, req.body);
      this.httpOk(res, updatedEntity);
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }

  async upsert(req, res) {
    try {
      const updatedEntity = await this.Repository.update(req.entity, req.body, { upsert: true });
      this.httpOk(res, updatedEntity);
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }

  async patch(req, res) {
    try {
      const updatedEntity = await this.Repository.patch(req.entity, req.body);
      this.httpOk(res, updatedEntity);
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }

  async remove(req, res) {
    try {
      await this.Repository.remove(req.entity);
      this.httpNotContent(res);
    } catch (error) {
      this.httpInternalServerError(res, error.message);
    }
  }

  async search(req, res) {
    let query = this.Repository.get(req.body);
    if (req.query && req.query.orderBy) {
      query = query.sort(
        (
          Array.isArray(req.query.orderBy)
            ? req.query.orderBy
            : [req.query.orderBy]
        ).reduce(
          (acc, prop) => ((prop[0] === '-')
            ? ({ ...acc, [prop.slice(1)]: -1 })
            : ({ ...acc, [prop]: 1 })),
          {},
        ),
      );
    }
    this.httpOk(res, await query);
  }
}

export default RepositoryOfTController;
