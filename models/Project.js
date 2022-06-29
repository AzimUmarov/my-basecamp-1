const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  user_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  users: [
    {
      type: Object,
      user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
      },
      email: { type: String, required: true },
      role: {
        type: String,
        enum: ['admin', 'member'],
        required: true
      },
      permissions: {
        type: Object,
        required: true,
        create: { type: Boolean, required: true },
        read: { type: Boolean, required: true },
        update: { type: Boolean, required: true },
        delete: { type: Boolean, required: true },
      }
    }
  ],
})

module.exports = model('Project', projectSchema);