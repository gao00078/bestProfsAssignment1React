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
			React.createElement('ul', {className: 'List'},
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
	propTypes: {
		itemItemPage: React.PropTypes.object.isRequired
		// onEditItem: React.PropTypes.func.isRequired
	},
	onEditFuc: function () {
		this.props.onEditItem(this.props.itemItemPage);
    },
	render: function () {
		return (
			React.createElement('div', {},
				React.createElement(NavBar, {}),
				React.createElement('h2', {}, this.props.itemItemPage.name),
				React.createElement('p', {}, 'Email: ' + this.props.itemItemPage.email),
				React.createElement("a", {
					href: "#/editItem/" + this.props.itemItemPage.id //Important! when go to edit item page, we need a id to find out the item we want to edit

					// type: "button",
					// onClick: this.onEditFuc
				}, "Edit")
			)
		);

	}
});

let AddEditForm = React.createClass({
    propTypes: {
        currentItem: React.PropTypes.object.isRequired,
        onChangeEditForm: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired
    },
    onNameChange: function (e) {
        this.props.onChangeEditForm(Object.assign({}, this.props.currentItem, {
            name: e.target.value
        }));
    },
    onEmailChange: function (e) {
        this.props.onChangeEditForm(Object.assign({}, this.props.currentItem, {
            email: e.target.value
        }));
    },
    onSave: function () {
        this.props.onSave(this.props.currentItem);
    },
    render: function () {
        return (
            React.createElement('form', {},
                React.createElement('input', {
                    type: 'text',
                    placeholder: this.props.currentItem.name,
                    value: this.props.currentItem.name,
                    onChange: this.onNameChange
                }),
                React.createElement('input', {
                    type: 'text',
                    placeholder: this.props.currentItem.email,
                    value: this.props.currentItem.email,
                    onChange: this.onEmailChange
                }),
                React.createElement('button', {
                    type: 'button',
                    onClick: this.onSave
                }, 'Save')
            )
        );
    }
});


let editItemPage = React.createClass({
	propTypes: {
		currentItem: React.PropTypes.object.isRequired,
        onChangeEditPage: React.PropTypes.func.isRequired,
		onSaveEditPage: React.PropTypes.func.isRequired
	},
	render: function () {
		return(
			React.createElement("div", {},
				React.createElement(NavBar, {}),
				React.createElement(AddEditForm,{
                    currentItem: this.props.currentItem,
                    onChangeEditForm: this.props.onChangeEditPage,
					onSave: this.props.onSaveEditPage
				})
			)
		)
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
function updateEditForm(item) {
	// console.log("enter updateEditForm ");
	// console.log(item);
    setState({
        newItem: item
    });
}

// function saveEditItem(item) {
// 	console.log("enter saveEditItem function");
//     console.log(item);
//     console.log(state.items);
//
//
// }



var state = {};

function setState(changes) {
	let component;
	let componentProperties = {};
	Object.assign(state, changes);

	state.deleteElement = function (e) {
		//                alert("hello");
		var elementId = e.target.id.split('-')[1];
		alert(e.target.id);
		var newArray = [];
		var items = state.items;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id != elementId) newArray.push(items[i]);
		}
		setState({
			items: newArray
		});

	};

	state.saveEditItem = function (e) {
        // console.log("enter saveEditItem function");
        console.log(state.newItem);
        console.log(state.items);
		//edit the item
        let index = parseInt(splittedUrl[1]);
        // console.log("index:"+ index);
        let elementReplacement = {key: index, id: index, name: state.newItem.name, email: state.newItem.email};

		var items = state.items;
		items.splice(index-1,1,elementReplacement);

		// state.items[index] = {key: index, id: index, name: state.newItem.name, email: state.newItem.email} ;


		// Object.assign({}, state.items, {key: index, id: index, name: state.newItem.name, email: state.newItem.email});

        setState({
            items: items,
            newItem: {
                name: '',
                email: ''
            }
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
		componentProperties = {
            itemItemPage: state.items.find(i => i.key == splittedUrl[1])
            // onEditItem: editItem
    	};
		break;

	case "editItem":
		component = editItemPage;
		componentProperties = {
            // currentItem: state.items.find(i => i.key == splittedUrl[1]),
            currentItem: state.newItem,
   			 onChangeEditPage: updateEditForm,
				 onSaveEditPage: state.saveEditItem


		};
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
