import { Schema } from 'mongoose';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 512,
  },
});

export default RoleSchema;
