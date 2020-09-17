import * as Collections from '../../common/constants/collections';
import RoleSchema from '../schemas/roleSchema';

export default function (connection) {
  return connection.model(Collections.Role, RoleSchema, Collections.Role);
}