const swaggerJSDoc = require('swagger-jsdoc');

// import * as swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'DigIT',
    version: '1.0.0',
    description: 'API descriptions'
  },
  host: 'localhost:3000',
  basePath: '/api'
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

// export default swaggerSpec;
