import RepositoryOfT from './repositoryOfT';

class ModelOfTRepository extends RepositoryOfT {
  constructor(model, readOnly = []) {
    super(model);
    this.readOnly = [
      '_id',
      '__v',
      'created.by',
      'created.on',

      // eslint-disable-line
      ...readOnly,
    ];
  }

  async get(query) {
    return this.Model.find(query);
  }

  async getWithParent(query, parent, parentAttributes) {
    return this.Model.find(query).populate(parent, parentAttributes);
  }

  async getByPageWithParent(query, key, skip, limit, parent, parentAttributes) {
    return this.Model.find(query).sort({[key]: 1}).skip(skip).limit(limit)
        .populate(parent, parentAttributes);
  }

  async count(query) {
    return this.Model.count(query);
  }

  async findOne(query) {
    return this.Model.findOne(query);
  }

  async removeMany(query) {
    return this.Model.deleteMany(query);
  }

  async removeById(query) {
    return this.Model.findByIdAndRemove(query);
  }

  async aggregate(query) {
    return this.Model.aggregate(query);
  }

  async getByPage(query, key, skip, limit) {
    return this.Model.find(query).sort({[key]: 1}).skip(skip).limit(limit);
  }

  async getById(id) {
    return this.Model.findById(id);
  }

  async upsert(find, update) {
    return this.Model.findOneAndUpdate(find, update, {
      upsert: true,
      useFindAndModify: false,
      returnOriginal: false,
    });
  }

  async create(entity) {
    const newEntity = new (this.Model)(entity);
    return newEntity.save();
  }

  async remove(entity) {
    if (!(entity instanceof this.Model)) {
      throw new TypeError('Invalid entity');
    }
    return entity.remove();
  }
}

export default ModelOfTRepository;
