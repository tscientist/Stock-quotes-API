
const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
      title: 'api-service',
      description: 'description',
    },
    host: 'localhost:3001',
    schemes: ['http'],
  };

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})