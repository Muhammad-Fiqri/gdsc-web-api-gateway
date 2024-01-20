const ErrorCheck = require("../../exceptions/ErrorCheck");
const errorCheck = require("../../exceptions/ErrorCheck");

class ProductsHandler {
  constructor(usersService, productsService, commentsService) {
    this._usersService = usersService;
    this._productsService = productsService;
    this._commentsService = commentsService;

    this.addProductHandler = this.addProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
  }

  async addProductHandler(request, h) {

    try {
      const product = await this._productsService.post(`/`, request.payload);

      return h.response(
        product.data
      ).code(201);
    } catch (error) {
      errorCheck(error);
    }
  }

  async getProductsHandler(request, h) {
    try {
      const { data: products } = await this._productsService.get('/');

      const getOwnerProduct = async (id) => {
        const { data: user } = await this._usersService.get(`/${id}`);
        return user.data.fullname;
      }

      return h.response({
        status: 'success',
        data: await Promise.all(products.data.map(async (product) => ({
          ...product,
          owner: await getOwnerProduct(product.userID),
        }))),
      }).code(200);
    } catch (error) {
      errorCheck(error);
    }
  }

  async getProductByIdHandler(request, h) {
    const { id } = request.params;
    try {
      const { data: product } = await this._productsService.get(`/${id}`);
      const { data: comments } = await this._commentsService.get(`/${id}`);

      const getOwnerProduct = async (id) => {
        const { data: user } = await this._usersService.get(`/${id}`);
        return user.data.fullname;
      }

      const mappedProduct = {
        ...product.data,
        owner: await getOwnerProduct(product.data.userID),
        comments: comments.data.map((comment) => ({
          ...comment
        })),
      }

      return h.response({
        status: 'success',
        data: mappedProduct
      }).code(200);
    } catch (error) {
      errorCheck(error);
    }
  }

  async deleteProductByIdHandler(request, h) {
    const { id } = request.params;
    try {
      const product = await this._productsService.delete(`/${id}`);

      return h.response(
        product.data
      ).code(200);
    } catch (error) {
      errorCheck(error);
    }
  }
}

module.exports = ProductsHandler;