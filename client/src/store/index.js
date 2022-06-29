import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const URL = "http://localhost:3000/api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    authErrorMessage: null,
    errorMessage: null,
    token: null,
    projects: [],
    project: null,
    currentPass: null
  },
  getters: {},
  mutations: {
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.clear()
    },
    SET_USER(state, user) {
      state.user = user;
      state.token = user.token;
      if (user.token) {
        state.token = user.token;
        localStorage.setItem("token", user.token);
      }
      if (user.userId) {
        localStorage.setItem("userId", user.userId);
      }
    },
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_PROJECT(state, project) {
      state.project = project;
    },
    SET_AUTH_ERROR_MESSAGE(state, message) {
      state.authErrorMessage = message;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    EDIT_USER(state, user) {
      state.user = user;
    },
    SET_PASS(state, pass) {
      state.currentPass = pass;
    },
    DELETE_USER(state) {
      state.projects = null
      state.token = null
      state.user = null
      state.currentPass = null
      localStorage.clear()
    }
  },
  actions: {
    // auth
    async login({ commit }, user) {
      try {
        const res = await axios.post(`${URL}/login`, user)
        commit("SET_USER", res.data);
      } catch (e) {
        commit("SET_AUTH_ERROR_MESSAGE", e.response.data.message);
        throw e
      }
    },
    async register({ commit }, user) {
      try {
        const res = await axios.post(`${URL}/register`, user)
        commit("SET_USER", res.data);
      } catch (e) {
        commit("SET_AUTH_ERROR_MESSAGE", err.response.data.message);
        throw e
      }
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    // projects
    async newProject({ commit }, project) {
      try {
        await axios.post(`${URL}/projects/create`, project, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    async deleteProject({ commit }, id) {
      try {
        await axios.delete(`${URL}/projects/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    async getProjects({ commit }) {
      try {
        const data = await axios.get(`${URL}/projects/all`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        commit("SET_PROJECTS", data.data);
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    async getProject({ commit }, id) {
      try {
        const res = await axios.get(`${URL}/projects/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        commit('SET_PROJECT', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async updateProject({ commit }, project) {
      try {
        const res = await axios.put(`${URL}/projects/update/${project.id}`, project, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        })
        commit('SET_PROJECT', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    // user
    async getUser({ commit }, id) {
      try {
        const res = await axios.get(`${URL}/user/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        commit("SET_USER", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async checkPass({ commit }, password) {
      try {
        const res = await axios.post(`${URL}/user/${localStorage.getItem('userId')}/checkpass`, password, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        commit("SET_PASS", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async editUser({ commit }, user) {
      try {
        const res = await axios.put(`${URL}/user/edit/${user.id}`, user, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        })
        commit('EDIT_USER', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async deleteUser({ commit }, id) {
      try {
        await axios.delete(`${URL}/user/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        commit('DELETE_USER')
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    // permissions
    async addMember({ commit }, member) {
      try {
        await axios.post(`${URL}/projects/addUser/${member.projectId}`, {
          user: {
            role: member.role,
            email: member.email,
          }
        }, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
      } catch (e) {
        commit("SET_ERROR_MESSAGE", e.response.data.message);
        throw e
      }
    }
  },
  modules: {},
});
