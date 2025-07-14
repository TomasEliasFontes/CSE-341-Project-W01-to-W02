// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contact Api',
        description: ' Contact Api'
    },
    host: 'localhost:3000',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// This will generate swagger.json
swaggerAutogen(outputFile,endpointFiles, doc);