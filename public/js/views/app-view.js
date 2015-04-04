// app-view.js
// 新Todo 项的创建 及 初始化 TodoList 渲染

var app = app || {};

(function ($){
	app.AppView = Backbone.View.extend({
		// el: '#todoapp',
		
		statsTemplate: _.template( $('#stats-template').html()),

		events: {
			'keypress .new-todo': 'createOnEnter',
			'click .clear-completed': 'clearCompleted',
			'click .toggle-all': 'toggleAllComplete'
		},
		initialize: function () {
			this.Todos = this.collection;
			this.allCheckbox = this.$el.find('.toggle-all')[0];
			// console.log(this.allCheckbox);
			this.$input = this.$el.find('.new-todo');
			
			this.$footer = this.$el.find('.footer');
			// console.log(this.$footer);
			this.$main = this.$el.find('.main');
			this.$list = this.$el.find('.todo-list');
			this.$filters = this.$el.find('.filters li a');
			// console.log(this.$filters);

			this.listenTo(this.Todos, 'add', this.addOne);
			this.listenTo(this.Todos, 'reset', this.addAll);

			this.listenTo(this.Todos, 'change:completed', this.filterOne);
			this.listenTo(this.Todos, 'filter', this.filterAll);
			this.listenTo(this.Todos, 'all', this.render);

			this.Todos.fetch({reset: true});
			// this.Todos.fetch({});
		},

		render: function () {
	// this.Todos = this.collection;
			var completed = this.Todos.completed().length;
			// console.log('completed:', completed);
			var remaining = this.Todos.remaining().length;
			// console.log('remaining:', remaining);


			if ( this.Todos.length ) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining,
					url: this.Todos.url
				}));
// console.log('this.$filters:',this.$filters);
				this.$filters
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},
		// 增加新的todo 项
		addOne: function ( todo ) {
			// this.Todos = this.collection;
			var view = new app.TodoView({ model: todo }); 
			this.$list.append( view.render().el );
		},

		addAll: function () {
		// this.Todos = this.collection;
			this.$list.html('');
			this.Todos.each(this.addOne, this);
		},

		filterOne: function (todo) {
			todo.trigger('visible');
		},

		filterAll: function () {
			// this.Todos = this.collection;
			this.Todos.each(this.filterOne, this);
		},

		// 新属性
		newAttributes: function () {
			return {
				title: this.$input.val().trim(),
				order: this.Todos.nextOrder(), // 排序
				completed: false
			};
		},
		createOnEnter: function ( event ) {
			// this.Todos = this.collection;
			if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
				return;
			}

			this.Todos.create ( this.newAttributes() );
			this.$input.val('');
		},
		// 清除所有已完成的todo items ，并且删除模型；
		clearCompleted: function () {
			_.invoke(this.Todos.completed(), 'destroy');
			return false;
		},

		toggleAllComplete: function () {
			// this.Todos = this.collection;
			var completed = this.allCheckbox.checked;

			this.Todos.each(function ( todo ) {
				todo.save({
					'completed': completed
				});
			});
		}
	});
})(jQuery);