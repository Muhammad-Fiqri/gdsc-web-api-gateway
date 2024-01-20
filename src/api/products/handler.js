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
    // Live Code with Aisyah

    try{
      const product = await this._productsService.post('/',request.payload);

      return h.response(
        product.data
      ).code(201);
    }catch(error){
      errorCheck(error);
    }

  }

  async getProductsHandler(request, h) {
    // Live Code with Aisyah

    try{
      const {data:product} = await this._productsService.get('/');

      const getOwnerProducts = async(id) => {
        const {data:user} = await this._usersService.get('/${id}');
        return user.data.fullname;
      }

      return h.response(
        status: 'success',
        data: await Promise.all(product.data.map(async(product)=>{
          ...product,
          owner:await getOwnerProducts(product.userID),
        }))
      ).code(200);

    }catch(error){
      errorCheck(error);
    }

  }

  async getProductByIdHandler(request, h) {
    // Live Code with Aisyah

    try{
      const {data:product} = await this._productsService.get('/');
      const {data:comments} = await this._commentsService.get('/${id}');

      const getOwnerProducts = async(id) => {
        const {data:user} = await this._usersService.get('/${id}');
        return user.data.fullname;
      }

      const mappedProduct = {
        ...product.data,
        owner:await getOwnerProducts(product.data.userID),
        comments:comments.data.map((comments)=>({
          ...comment
        }))
      }

      return h.response(
        status: success,
        data:mappedProduct
      ).code(200);

    }catch(error){
      errorCheck(error);
    }
  }

  async deleteProductByIdHandler(request, h) {
    // Live Code with Aisyah
    const {id} = request.params;
    try{
      const product = await this._productsService.delete('/${id}');

      return h.response(
        product.data
      ).code(201);

    }catch(error){
      errorCheck(error);
    }
  }
}

module.exports = ProductsHandler;
