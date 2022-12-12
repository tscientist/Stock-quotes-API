const axios = require("axios");
const stockModel = require("../models/stock.js");
const sequelize = require("../config/db");

function getStock(req, res) {
    const symbol = req.query.q;
    
    if (!symbol) return res.status(400).send({message: "The symbol entered may be invalid."});  
    
    axios.post("http://localhost:3002/stock", {
        symbol: symbol
      })
      .then((response) => {
        if (response.data.open == "N/D" && response.data.close == "N/D") {
          res.status(400).send({message: "Error fetching stock. The symbol entered may be incorrect."});
        } else {
          return saveStock(response.data, req.user.id, res);
        }
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error fetching stock.",
          error: error
        });
      });
}


 function saveStock(stockInfo, userId, res) {
  stockModel.create({
      name: stockInfo.name,
      symbol: stockInfo.symbol.toLowerCase(),
      open: stockInfo.open,
      high: stockInfo.high,
      low: stockInfo.low,
      close: stockInfo.close,
      userId: userId
  })
  .then((result) => { 
    if (result) res.status(200).send(stockInfo);
  })
  .catch((error) => {
    res.status(500).send({
      message: "Error saving stock.",
      error: error
    });
  });
}

function getStockHistory(req, res) {
  stockModel.findAll({
    attributes: [["createdAt", "date"], "name", "symbol", "open", "high", "low", "close"]
  },
  {
    where: {
      userId: req.user.id
    }
  }).then((result) => res.json(result))
  .catch((error) => {
    res.status(500).send({
      message: "Error searching user stock history.",
      error: error
    });
  });
}

function getStats(req, res) {
  if (req.user.role !== "admin"){
    return res.status(400).json({ message: "You don`t have access to this route!" });
  }

  stockModel.findAll({
    raw: true,
    attributes: [
      ["symbol","stock"],
      [sequelize.fn("COUNT", sequelize.col("symbol")), "times_requested"],
    ],
    group: "symbol",
    order: [
      ["times_requested", "DESC"],
      ["symbol", "ASC"]
    ],
    limit: 5
  }).then((result) => {
    return res.status(200).json(result)
  })
  .catch((error) => {
    res.status(500).send({
      message: "Error searching most requested stocks.",
      error: error
    });
  });
}

module.exports = {
  getStock,
  getStockHistory,
  getStats
};