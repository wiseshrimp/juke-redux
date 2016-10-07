var router = require('express').Router();
var Promise = require('bluebird');

var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');

router.get('/attractions', function (req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function (hotels, restaurants, activities) {
    res.json({
      hotels: hotels,
      restaurants: restaurants,
      activities: activities
    });
  })
  .catch(next);
});

router.get('/hotels', function (req, res, next) {
  Hotel.findAll()
  .then(function (hotels) {
    res.json(hotels);
  })
  .catch(next);
});

router.get('/restaurants', function (req, res, next) {
  Restaurant.findAll()
  .then(function (restaurants) {
    res.json(restaurants);
  })
  .catch(next);
});

router.get('/activities', function (req, res, next) {
  Activity.findAll()
  .then(function (activities) {
    res.json(activities);
  })
  .catch(next);
});

module.exports = router;
