import {Schema} from 'mongoose';
import * as Collections from '../../common/constants/collections';


const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 512
  },
  productId: {
    type: String,
    required: true,
    maxLength: 512
  },
  // category: {
  //   type: String,
  //   required: true,
  //   maxLength: 512
  // },
  category: {
    type: Schema.Types.ObjectId,
    ref: Collections.Category
  },
  // seller: {
  //   type: Schema.Types.ObjectId,
  //   ref: Collections.User
  // },
  sellerId: {
    type: String,
    required: true,
    maxLength: 512
  },
  isDeleted: {
    type: Boolean,
    required: true
  }
});

export default ProductSchema;
