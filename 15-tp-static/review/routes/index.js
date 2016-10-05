var router = require('express').Router();
var Bluebird = require('bluebird');

var db = require('../models');
var Activity = db.model('activity');
var Restaurant = db.model('restaurant');
var Hotel = db.model('hotel');

router.get('/', function (req, res, next) {
  Bluebird.all([
    Activity.findAll(),
    Restaurant.findAll(),
    Hotel.findAll()
  ])
  .then(function (arrOfResults) {
    var activities = arrOfResults[0];
    var restaurants = arrOfResults[1];
    var hotels = arrOfResults[2];
    res.render('index', {
      hotels,
      activities,
      restaurants
    });
  })
  .catch(next);
});

module.exports = router;