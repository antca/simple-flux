import {EventEmitter} from 'events';
import Remutable from 'remutable';

class Store extends EventEmitter {

	constructor(config, dispatcher) {
		super();
		const state = new Remutable();
		this.state = state.createConsumer();
		this._state = state.createProducer();
		Object.keys(config).map(key => this[key] = config[key]);
		this.init();
		dispatcher.register(({type, data}) => this.handleDispatch(type, data));

	}

	handleDispatch(type, data) {
		const handlerName = `on${allCapsToCamel(type)}`;
		if(this[handlerName]) this[handlerName](data);
	}

	setState(newState) {
		const keys = Object.keys(newState);
		keys.map((key) => {
			this._state.set(key, newState[key]);
		});
		const patch = this._state.commit();
		this.emit('change', keys);
	}

	mixin(subscribeTo) {
		const subscribedStoreKeys = Object.keys(subscribeTo);
		const store = this;
		const getSubscribedState = (keys) => {
			const stateChange = {};
			keys.map((key) => {
				if(subscribedStoreKeys.indexOf(key) !== -1) {
					stateChange[subscribeTo[key]] = this.state.head.get(key);
				}
			});
			return stateChange;
		}
		return {
			getInitialState() {
				return getSubscribedState(subscribedStoreKeys);
			},
			_storeEventHandler(keys) {
				this.setState.call(this, getSubscribedState(keys));
			},
			componentDidMount() {
				store.on('change', this._storeEventHandler);
			},
			componentWillUnmount() {
				store.removeListener('change', this._storeEventHandler);
			}
		}
	}
}

function allCapsToCamel(allcaps = '') {
	return allcaps
	.toLowerCase()
	.split('_')
	.map(word =>  word[0].toUpperCase() + word.slice(1))
	.join('');
}

export default Store;