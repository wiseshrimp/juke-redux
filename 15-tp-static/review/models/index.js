var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

// makes an association (could be many to one), puts a foreign key on hotel, called placeId
// also gives us instance.getPlace(), instance.setPlace(), instance methods
Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = db;