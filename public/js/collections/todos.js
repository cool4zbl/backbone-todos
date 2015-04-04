// // js/collections/todos.js

var app = app || {};
(function () {
	app.TodoList = Backbone.Collection.extend({
		model: app.Todo,
		// description: '',
		name:'',
		localStorage: new Backbone.LocalStorage(this.name),
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

})();