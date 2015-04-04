// js/routers/router.js
var app = app || {};
// Todo AppRouter
(function () {
	var Workspace = Backbone.Router.extend({
		routes:{
			'red/:status': 'setRedFilter',
			'orange/:status': 'setOrangeFilter',
			'blue/:status': 'setBlueFilter',
			'green/:status': 'setGreenFilter',

			// '*filter': 'setFilter'
		},

		setFilter: function ( param ) {
	
			app.TodoFilter = param || '';

			app.firstTodos.trigger('filter');
		},
		setRedFilter: function (status) {
			$(this).hide('slow');
			if( status ) {
				// console.log(status);
				app.TodoFilter = status || '';
				// console.log(app.TodoFilter);
				app.firstTodos.trigger('filter');
			}
		},
		setOrangeFilter: function (status) {
	
			if( status ) {
				// console.log(status);
				app.TodoFilter = status || '';
				// console.log(app.TodoFilter);
				app.secondTodos.trigger('filter');
			}
		},
		setBlueFilter: function (status) {
	
			if( status ) {
				// console.log(status);
				app.TodoFilter = status || '';
				// console.log(app.TodoFilter);
				app.thirdTodos.trigger('filter');
			}
		},
		setGreenFilter: function (status) {

			if( status ) {
				// console.log(status);
				app.TodoFilter = status || '';
				// console.log(app.TodoFilter);
				app.fourthTodos.trigger('filter');
			}
		}
	});
	app.TodoRouter = new Workspace();
	Backbone.history.start();
})();