// js/models/todo.js

var app =  app || {};

(function () {
  app.Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    },
    // localStorage: new Backbone.LocalStorage(this.title),
    toggle: function () {
      this.save({ 
        completed: !this.get('completed')
      });
    }
  });
})();