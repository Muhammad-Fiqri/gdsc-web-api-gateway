const errorCheck = require("../../exceptions/ErrorCheck");

class UsersHandler {
  constructor(usersService) {
    this._usersService = usersService;

    this.addUserHandler = this.addUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.deleteUserByIdHandler = this.deleteUserByIdHandler.bind(this);
    this.getUsersHandler = this.getUsersHandler.bind(this);
  }

  // Register
  async addUserHandler(request, h) {
    try {
      const users = await this._usersService.post(`/`, request.payload);

      return h.response(
        users.data
      ).code(201);
    } catch (error) {
      errorCheck(error);
    }
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;
    try {
      const users = await this._usersService.get(`/${id}`);

      return h.response(
        users.data
      ).code(200);
    } catch (error) {
      errorCheck(error);
      console.log(error);
    }
  }

  async deleteUserByIdHandler(request, h) {
    const { id } = request.params;
    try {
      const users = await this._usersService.delete(`/${id}`);

      return h.response(
        users.data
      ).code(200);
    } catch (error) {
      errorCheck(error);
    }
  }

  async getUsersHandler(request, h) {
    try {
      const users = await this._usersService.get(`/`);

      return h.response(
        users.data
      ).code(200);
    } catch (error) {
      console.log(error);
      errorCheck(error);
    }
  }
}

module.exports = UsersHandler;