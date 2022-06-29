const { Schema, model } = require('mongoose');

const subtaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
})

module.exports = model('Subtask', subtaskSchema);