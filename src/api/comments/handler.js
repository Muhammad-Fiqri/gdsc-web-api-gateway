const errorCheck = require("../../exceptions/ErrorCheck");

class CommentsHandler {
  constructor(commentsService) {
    this._commentsService = commentsService;

    this.addCommentHandler = this.addCommentHandler.bind(this);
    this.getCommentsByIdHandler = this.getCommentsByIdHandler.bind(this);
    this.deleteCommentByIdHandler = this.deleteCommentByIdHandler.bind(this);
  }

  async addCommentHandler(request, h) {
    // Live Code with Nurhuda
    try {
      const users = this._commentsService.post(`/${productId}/user/${userId}`, request.payload);

      return h.response(
        users.data
      ).code(201)
    } catch (error) {
      errorCheck(error)
    }
  }

  async getCommentsByIdHandler(request, h) {
    // Live Code with Nurhuda
    try {
      const users = this._commentsService.get(`/${productId}`, request.payload);

      return h.response(
        users.data
      ).code(201)
    } catch (error) {
      errorCheck(error)
    }
  }

  async deleteCommentByIdHandler(request, h) {
    // Live Code with Nurhuda
    try {
      const users = this._commentsService.delete(`/${productId}`, request.payload);

      return h.response(
        users.data
      ).code(201)
    } catch (error) {
      errorCheck(error)
    }
  }
}

module.exports = CommentsHandler;
