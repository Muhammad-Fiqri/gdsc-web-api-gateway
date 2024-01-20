const errorCheck = require("../../exceptions/ErrorCheck");

class CommentsHandler {
  constructor(commentsService) {
    this._commentsService = commentsService;

    this.addCommentHandler = this.addCommentHandler.bind(this);
    this.getCommentsByIdHandler = this.getCommentsByIdHandler.bind(this);
    this.deleteCommentByIdHandler = this.deleteCommentByIdHandler.bind(this);
  }

  async addCommentHandler(request, h) {
    const { productId, userId } = request.params;

    try {
      const comment = await this._commentsService.post(`/${productId}/user/${userId}`, request.payload);

      return h.response(
        comment.data
      ).code(201);
    } catch (error) {
      const { status, data } = errorCheck(error);
      console.log(status, data);
    }
  }

  async getCommentsByIdHandler(request, h) {
    const { productId } = request.params;
    try {
      const comments = await this._commentsService.get(`/${productId}`);

      return h.response(
        comments.data
      ).code(200);
    } catch (error) {
      errorCheck(error);
    }
  }

  async deleteCommentByIdHandler(request, h) {
    const { commentId } = request.params;

    try {
      const comment = await this._commentsService.delete(`/${commentId}`);

      return h.response(
        comment.data
      ).code(200);
    } catch (error) {
      console.log(error);
      errorCheck(error);
    }
  }
}

module.exports = CommentsHandler;