import * as Collections from '../../common/constants/collections';
import CategorySchema from '../schemas/categorySchema';

export default function (connection) {
  return connection.model(Collections.Category, CategorySchema, Collections.Category);
}
