import * as Collections from '../../common/constants/collections';
import ProductSchema from '../schemas/productSchema';

export default function (connection) {
  return connection.model(Collections.Product, ProductSchema, Collections.Product);
}
