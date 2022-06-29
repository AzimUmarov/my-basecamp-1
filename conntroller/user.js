const userModel = require('../models/User.js');
const bcrypt = require('bcrypt');

class UserController {
  async delete (req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'Please provide a valid id' });
      }
      const validId = await userModel.findById(id);
      if (!validId) {
        return res.status(404).json({ message: 'User is not exist' });
      }
      await userModel.findByIdAndDelete(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async edit (req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'Please provide a valid id' });
      }
      const { name, email, password } = req.body;
      const user = await userModel.findByIdAndUpdate(id, { name, email, password });
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` }); 
    }
  }
  async checkPassword(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({message: 'Please provide a valid id'});
      }
      const { password } = req.body;
      const user = await userModel.findById(id);
      const unhashPass = await bcrypt.compareSync(password, user.password);
      if (unhashPass != password) {
        return res.status(404).json({ message: 'Password is incorrect' });
      }
      return res.status(200).json({ message: 'Password is correct' });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async getAll(req, res) {
    try {
      const users = await userModel.find()
      return res.status(200).json(users)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'Please provide a valid id' });
      }
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User is not exist' });
      }
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new UserController()