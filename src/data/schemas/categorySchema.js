import {Schema} from 'mongoose';


const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 512
  }
});

export default CategorySchema;
