const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
})

module.exports = model('Task', taskSchema);