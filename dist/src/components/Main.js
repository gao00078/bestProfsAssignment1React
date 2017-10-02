var ListItem = React.createClass({
	propTypes: {
		'id': React.PropTypes.number,
		'name': React.PropTypes.string,
		'email': React.PropTypes.string,
		'onDeleteButtonClicked': React.PropTypes.func
	},
	render: function () {
		return (
			React.createElement('li', {},
				React.createElement('button', {
					id: 'deleteBtn-' + this.props.id,
					onClick: this.props.onDeleteButtonClicked,
					className: 'deleteBtn'
				}, 'X'),
				React.createElement('a', {
					href: '#/item/' + this.props.id
				}, this.props.name)
			)
		);
	}
});

var List = React.createClass({
	propTypes: {
		items: React.PropTypes.array,
		deleteElement: React.PropTypes.func
	},
	render: function () {
		var deleteElementCallback = this.props.deleteElement;
		var listOfListItems = this.props.items.map(function (item) {
			item.onDeleteButtonClicked = deleteElementCallback;
			return React.createElement(ListItem, item);
		});

		return (
			React.createElement('ul', {},
				listOfListItems
			)
		);

	}
});

let AddNewForm = React.createClass({
	propTypes: {
		newItem: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired
	},
	onNameChange: function (e) {
		this.props.onChange(Object.assign({}, this.props.newItem, {
			name: e.target.value
		}));
	},
	onEmailChange: function (e) {
		this.props.onChange(Object.assign({}, this.props.newItem, {
			email: e.target.value
		}));
	},
	onSubmit: function () {
		this.props.onSubmit(this.props.newItem);
	},
	render: function () {
		return (
			React.createElement('form', {},
				React.createElement('input', {
					type: 'text',
					placeholder: 'Name',
					value: this.props.newItem.name,
					onChange: this.onNameChange
				}),
				React.createElement('input', {
					type: 'text',
					placeholder: 'Email Address',
					value: this.props.newItem.email,
					onChange: this.onEmailChange
				}),
				React.createElement('button', {
					type: 'button',
					onClick: this.onSubmit
				}, 'Submit')
			)
		);
	}
});
let NavBar = React.createClass({
	render: function () {
		return (
			React.createElement('ul', {
				className: 'nav-bar'
			},
			React.createElement('li', {},
				React.createElement('a', {
					href: '#/list'
				}, 'List')
			),
			React.createElement('li', {},
				React.createElement('a', {
					href: '#/new'
				}, 'Add')
			)
			)
		);

	}
});

let ListPage = React.createClass({
	propTypes: {
		ListPageItems: React.PropTypes.array,
		ListPageDeleteElement: React.PropTypes.func
	},
	render: function () {
		return (
			React.createElement('div', {},
				React.createElement(NavBar, {}),
				React.createElement(List, {
					items: this.props.ListPageItems,
					deleteElement: this.props.ListPageDeleteElement
				})
			)
		);
	}
});

let AddNewProfPage = React.createClass({
	propTypes: {
		newItem: React.PropTypes.object.isRequired,
		items: React.PropTypes.object.isRequired,
		onNewItemChange: React.PropTypes.func.isRequired,
		onSubmitNewItem: React.PropTypes.func.isRequired
	},
	render: function () {
		return (
			React.createElement('div', {},
				React.createElement(NavBar, {}),
				React.createElement(AddNewForm, {
					newItem: this.props.newItem,
					onChange: this.props.onNewItemChange,
					onSubmit: this.props.onSubmitNewItem
				})

			)
		);
	}
});

let ItemPage = React.createClass({
	render: function () {
		return (
			React.createElement('div', {},
				React.createElement(NavBar, {}),
				React.createElement('h2', {}, this.props.name),
				React.createElement('p', {}, 'Email: ' + this.props.email)
			)
		);

	}
});

function updateNewMenuItem(item) {
	setState({
		newItem: item
	});
}

function addNewItem(item) {
	let itemList = state.items;
	itemList.push(Object.assign({}, {
		key: itemList.length + 1,
		id: itemList.length + 1
	}, item));
	setState({
		items: itemList,
		newItem: {
			name: '',
			email: ''
		}
	});
}


var state = {};

function setState(changes) {
	let component;
	let componentProperties = {};
	Object.assign(state, changes);

	state.deleteElement = function (e) {
		//                alert("hello");
		var elementId = e.target.id.split('-')[1];
		alert(e.target.id);
		// alert(elementId);
		var newArray = [];
		var items = state.items;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id != elementId) newArray.push(items[i]);
		}
		setState({
			items: newArray
		});

	};

	let splittedUrl = state.location.replace(/^#\/?|\/$/g, '').split('/');

	switch (splittedUrl[0]) {
	case 'list':
		component = ListPage;
		componentProperties = {
			ListPageItems: state.items,
			ListPageDeleteElement: state.deleteElement
		};
		break;
	case 'new':
		component = AddNewProfPage;
		componentProperties = {
			newItem: state.newItem,
			items: state.items,
			onNewItemChange: updateNewMenuItem,
			onSubmitNewItem: addNewItem
		};
		break;
	case 'item':
		component = ItemPage;
		componentProperties = state.items.find(i => i.key == splittedUrl[1]);
		break;
	default:
		component = ListPage;
		componentProperties = {
			ListPageItems: state.items,
			ListPageDeleteElement: state.deleteElement
		};


	}

	ReactDOM.render(React.createElement(component, componentProperties), document.getElementById('react-app'));


}

window.addEventListener('hashchange', () => setState({
	location: location.hash
}));


setState({
	location: location.hash,
	items: listOfProfs,
	newItem: {
		name: '',
		email: ''
	}
});
