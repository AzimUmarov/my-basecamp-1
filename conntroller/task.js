const taskModel = require('../models/Task');

class Task {
  async getAll(req, res) {
    try {
      const tasks = await taskModel.find({
        user: req.user.userId,
        project: req.params.id
      })
      return res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const task = await taskModel.findById(id);
      
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async create(req, res) {
    try {
      
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async delete(req, res) {
    try {
      
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async update(req, res) {
    try {
      
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Task();