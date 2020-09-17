import {Schema} from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 512
  },
  categoryId: {
    type: String,
    required: true,
    maxLength: 512
  },
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
