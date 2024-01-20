const ProductsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'products',
  version: '1.0.0',
  register: async (server, {
    usersService,
    productsService,
    commentsService
  }) => {
    const productsHandler = new ProductsHandler(
      usersService,
      productsService,
      commentsService
    );
    server.route(routes(productsHandler));
  }
}