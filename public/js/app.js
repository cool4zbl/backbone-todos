// js/app.js

var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(document).ready(function() {

  app.firsttodoView = new app.AppView({
    el: $('#first-wrapper'),
    // collection: new app.TodoList({'name': 'red'})
    collection: app.firstTodos
  });
  app.secondtodoView = new app.AppView({
    el: $('#second-wrapper'),
    collection: app.secondTodos
  });
  app.thirdtodoView = new app.AppView({
    el: $('#third-wrapper'),
    collection: app.thirdTodos
  });
  app.fourthtodoView = new app.AppView({
    el: $('#fourth-wrapper'),
    collection: app.fourthTodos
  });


});