require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Adapter
const api = require('./adapter/api.js');

// Services Handler
const users = require('./api/users');
const products = require('./api/products');
const comments = require('./api/comments');

const ServerError = require('./exceptions/ServerError.js');

const init = async () => {
  // Live Code with Faishal

  const {
    API_USERS,
    API_PRODUCTS,
    API_COMMENTS
  } = process.env;

  const usersService = api(`https://${API_USERS}`);
  const productsService = api(`https://${API_PRODUCTS}`);
  const commentsService = api(`https://${API_COMMENTS}`);

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*']
      },
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: async (request, h) => {
        return h.response({
          status: 'success',
          message: `Helloo!`
        }).code(200);
      }
    },
    {
      method: '*',
      path: '/{any*}',
      handler: (request, h) => {
        return h.response('404 Error! Page Not Found!').code(404);
      }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ServerError) {
      const newResponse = h.response({
        status: 'error',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  // Live Code with Faishal
  await server.register([
    {
      plugin: users,
      options: {
        usersService,
      },
      routes: {
        prefix: '/users'
      },
    },
    {
      plugin: products,
      options: {
        usersService,
        productsService,
        commentsService
      },
      routes: {
        prefix: '/products'
      },
    },
    {
      plugin: comments,
      options: {
        commentsService,
      },
      routes: {
        prefix: '/comments'
      },
    },
  ]);

  await server.start();
  console.log(`
    API_GATEWAY Running on ${server.info.uri}
    SERVICE USERS Running on ${process.env.API_USERS}
    SERVICE PRODUCTS Running on ${process.env.API_PRODUCTS}
    SERVICE COMMENTS Running on ${process.env.API_COMMENTS}
  `);
}

init();