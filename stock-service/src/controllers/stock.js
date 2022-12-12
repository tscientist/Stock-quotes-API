const axios = require('axios');

function getStock(req, res) {
    axios.get(`https://stooq.com/q/l/?s=${req.body.symbol}&f=sd2t2ohlcvn&h&e=csv`)
      .then(function (response) {
        let stockInfo = formartStockInfo(response);

        res.send({
          "name": stockInfo[17],
          "symbol": stockInfo[9],
          "open": stockInfo[12],
          "high": stockInfo[13],
          "low":  stockInfo[14],
          "close": stockInfo[15]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
}

function formartStockInfo(response) {
  let stockTextInformation = response.data.replace("\r\n", ",");
  return stockTextInformation.trim().split(",");
}

module.exports = {
    getStock
};