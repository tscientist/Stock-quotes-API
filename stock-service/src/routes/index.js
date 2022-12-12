var express = require('express');
var router = express.Router();
const stockController = require("../controllers/stock");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({})
});

router.post('/stock', stockController.getStock);


module.exports = router;
