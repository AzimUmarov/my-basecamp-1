const projectModel = require("../models/Project");
const userModel = require('../models/User.js');

class Project {
  async getAll(req, res) {
    try {
      const projects = await projectModel.find({ user: req.user.userId });
      return res.status(200).json(projects);
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
      const project = await projectModel.findById(id);
      if (project.user_id != req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(200).json(project);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async create(req, res) {
    try {
      const { title, description, users } = req.body;
      console.log(req.body);
      const project = new projectModel({
        title,
        description,
        user_id: req.user.userId,
        users: {
          user_id: req.user.userId,
          email: req.user.email,
          role: "admin",
          permissions: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
        }
      });
      await project.save();
      return res.status(201).json({ message: "Project created successfully" });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const project = await projectModel.findById(id);
      if (project.user_id != req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      await projectModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const project = await projectModel.findById(id);
      if (project.user_id != req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { title, description } = req.body;
      await projectModel.findByIdAndUpdate(id, { title, description });
      return res.status(200).json({ message: "Project updated successfully" });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async addUser(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const { user } = req.body;
      const candidate = await userModel.findOne({ email: user.email });
      if (!candidate) {
        return res.status(404).json({ message: "User not found" });
      }
      const project = await projectModel.findById(id);
      const userExists = project.users.find(
        (user) => user.user_id.toString() === candidate._id.toString()
      );
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
      project.users.push({
        user_id: candidate._id,
        email: candidate.email,
        role: user.role,
        permissions: {
          create: user.role === "admin" ? true : false,
          read: user.role === "admin" ? true : false,
          update: user.role === "admin" ? true : false,
          delete: user.role === "admin" ? true : false,
        },
      });
      await project.save();
      return res.status(200).json({ message: "User added successfully" });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async removeUser(req, res) {
    try {
      const id = req.params.id
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const { user } = req.body;
      const candidate = await userModel.findOne({ email: user.email });
      if (!candidate) {
        return res.status(404).json({ message: "User not found" });
      }
      const project = await projectModel.findById(id);
      project.users = project.users.filter(
        (user) => user.user_id.toString() !== candidate._id.toString() 
      );
      await project.save();
      return res.status(200).json({ message: "User removed successfully" });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async addPermission(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const { user } = req.body;
      const candidate = await userModel.findOne({ email: user.email });
      if (!candidate) {
        return res.status(404).json({ message: "User not found" });
      }
      const project = await projectModel.findById(id);
      const userExists = project.users.find(
        (user) => user.user_id.toString() === candidate._id.toString()
      );
      if (!userExists) {
        return res.status(400).json({ message: "User does not exist" });
      }
      userExists.role = user.role;
      if (user.role == "member") {
        userExists.permissions = {
          create: user.permissions.create,
          read: user.permissions.read,
          update: user.permissions.update,
          delete: user.permissions.delete,
        }
      } else {
        userExists.permissions = {
          create: true,
          read: true,
          update: true,
          delete: true,
        }
      }
      await project.save();
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Project();