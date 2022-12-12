var express = require('express');
var router = express.Router();
const stockController = require("../controllers/stock");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger_output.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({})
});

router.post('/stock', stockController.getStock);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));


module.exports = router;
