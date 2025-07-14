// routes/swagger.js
const router      = require('express').Router();
const swaggerUi   = require('swagger-ui-express');
const swaggerDoc  = require('../swagger.json');

// Monta la UI de Swagger en /api-docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc));

module.exports = router;
