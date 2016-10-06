'use strict';
/* global $ utilsModule tripModule attractionModule */

/**
 * A module for constructing front-end `day` objects, optionally from back-end
 * data, and managing the `attraction`s associated with a day.
 *
 * Day objects contain `attraction` objects. Each day also has a `.$button`
 * with its day number. Days can be drawn or erased via `.show()` and
 * `.hide()`, which updates the UI and causes the day's associated attractions
 * to `.show()` or `.hide()` themselves.
 *
 * This module has one public method: `.create()`, used by `days.js`.
 */

var dayModule = (function () {

  // jQuery selections

  var $dayButtons, $dayTitle;
  $(function () {
    $dayButtons = $('.day-buttons');
    $dayTitle = $('#day-title > span');
  });

  // Day class and setup

  function Day (data) {
    // for brand-new days
    this.number = 0;
    this.hotel = null;
    this.restaurants = [];
    this.activities = [];
    // for days based on existing data
    utilsModule.merge(data, this);
    if (this.hotel) this.hotel = attractionModule.create(this.hotel);
    this.restaurants = this.restaurants.map(attractionModule.create);
    this.activities = this.activities.map(attractionModule.create);
    // remainder of constructor
    this.buildButton().showButton();
  }

  // automatic day button handling

  Day.prototype.setNumber = function (num) {
    this.number = num;
    this.$button.text(num);
  };

  Day.prototype.buildButton = function () {
    this.$button = $('<button class="btn btn-circle day-btn"></button>')
      .text(this.number);
    var self = this;
    this.$button.on('click', function (){
      this.blur(); // removes focus box from buttons
      tripModule.switchTo(self);
    });
    return this;
  };

  Day.prototype.showButton = function () {
    this.$button.appendTo($dayButtons);
    return this;
  };

  Day.prototype.hideButton = function () {
    this.$button.detach(); // detach removes from DOM but not from memory
    return this;
  };

  Day.prototype.show = function () {
    // day UI
    this.$button.addClass('current-day');
    $dayTitle.text('Day ' + this.number);
    // attractions UI
    function show (attraction) { attraction.show(); }
    if (this.hotel) show(this.hotel);
    this.restaurants.forEach(show);
    this.activities.forEach(show);
  };

  Day.prototype.hide = function () {
    // day UI
    this.$button.removeClass('current-day');
    $dayTitle.text('Day not Loaded');
    // attractions UI
    function hide (attraction) { attraction.hide(); }
    if (this.hotel) hide(this.hotel);
    this.restaurants.forEach(hide);
    this.activities.forEach(hide);
  };

  // day updating

  Day.prototype.addAttraction = function (attraction) {
    var theDay = this;
    switch (attraction.type) {
      case 'hotel':
        $.ajax({
          method: 'PUT',
          url: '/api/days/' + theDay.id + '/hotel',
          data: {id: attraction.id}
        })
        .then(function () {
          if (theDay.hotel) theDay.hotel.hide();
          theDay.hotel = attraction;
          attraction.show();
        })
        .catch(utilsModule.logErr);
        break;
      case 'restaurant':
        $.ajax({
          method: 'POST',
          url: '/api/days/' + theDay.id + '/restaurants',
          data: {id: attraction.id}
        })
        .then(function () {
          utilsModule.pushUnique(theDay.restaurants, attraction);
          attraction.show();
        })
        .catch(utilsModule.logErr);
        break;
      case 'activity':
        $.ajax({
          method: 'POST',
          url: '/api/days/' + theDay.id + '/activities',
          data: {id: attraction.id}
        })
        .then(function () {
          utilsModule.pushUnique(theDay.activities, attraction);
          attraction.show();
        })
        .catch(utilsModule.logErr);
        break;
      default: console.error('bad type:', attraction);
    }
  };

  Day.prototype.removeAttraction = function (attraction) {
    var theDay = this;
    switch (attraction.type) {
      case 'hotel':
        $.ajax({
          method: 'DELETE',
          url: '/api/days/' + theDay.id + '/hotel'
        })
        .then(function () {
          theDay.hotel.hide();
          theDay.hotel = null;
        })
        .catch(utilsModule.logErr);
        break;
      case 'restaurant':
        $.ajax({
          method: 'DELETE',
          url: '/api/days/' + theDay.id + '/restaurants/' + attraction.id
        })
        .then(function () {
          utilsModule.remove(theDay.restaurants, attraction);
          attraction.hide();
        })
        .catch(utilsModule.logErr);
        break;
      case 'activity':
        $.ajax({
          method: 'DELETE',
          url: '/api/days/' + theDay.id + '/activities/' + attraction.id
        })
        .then(function () {
          utilsModule.remove(theDay.activities, attraction);
          attraction.hide();
        })
        .catch(utilsModule.logErr);
        break;
      default: console.error('bad type:', attraction);
    }
  };

  // globally accessible module methods

  var publicAPI = {

    create: function (databaseDay) {
      return new Day(databaseDay);
    }

  };

  return publicAPI;

}());
