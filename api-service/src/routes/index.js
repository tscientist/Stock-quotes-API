var express = require('express');

var router = express.Router();
const stockController = require("../controllers/stock");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger_output.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({})
});

router.post('/register', userController.createUser);

router.post('/auth', authController.createToken)

router.get('/stock', authController.verifyAccessToken, stockController.getStock);

router.get('/history', authController.verifyAccessToken, stockController.getStockHistory);

router.get('/stats', authController.verifyAccessToken, stockController.getStats);

router.post('/reset-password', userController.resetPassword)

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
