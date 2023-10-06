const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digit api',
      version: '1.0.0',
      description: 'Invetory endpoints',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
