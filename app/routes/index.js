var express = require('express')
var router = express.Router()
var appData = require('../../data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })
})
router.get('/api/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
})
router.get('/api/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
})
module.exports = router
