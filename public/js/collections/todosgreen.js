// todosred.js

var app = app || {};
(function () {
	app.fourthTodoList = Backbone.Collection.extend({
		model: app.Todo,
		url:'green',
		localStorage: new Backbone.LocalStorage('fourth'),
		// localStorage: '',
		completed: function () {
			return this.filter(function(todo) {
				return todo.get('completed');
			});
		},
		remaining: function () {
			return this.without.apply( this, this.completed() );
		},
	  // 序列产生器 
		nextOrder: function () {   
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		comparator: function ( todo ) {
			return todo.get('order');
		}
	});
	app.fourthTodos = new app.fourthTodoList();

})();