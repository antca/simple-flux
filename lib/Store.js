import {EventEmitter} from 'events';
import * as Remutable from 'remutable';

class Store {
	constructor(config) {
		this.eventHandler = new EventEmitter();
		this.state = new Remutable();
		this.patchQueue = [];
		this.setState(config.initialState || {});
		this.handlers = config;
	}
	registerActionSet(namespace, actionSet) {
		actionSet.eventHandler.on('action', (action) => {
			let actionName = action.name;
			actionName = actionName[0].toUpperCase() + actionName.slice(1);
			if(typeof this.handlers[namespace][`on${actionName}`] !== 'undefined') {
				this.handlers[namespace][`on${actionName}`].call(this, action.payload);
			} else {
				console.warn(`There is no handler for action: ${namespace}.${action.name}`);
			}
		});
	}
	setState(newState) {
		const keys = Object.keys(newState);
		keys.map((key) => {
			this.state.set(key, newState[key]);
		});
		const patch = this.state.commit();
		this.eventHandler.emit('change', keys);
	}
	mixin(subscribeTo) {
		const subscribedStoreKeys = Object.keys(subscribeTo);
		const storeContext = this;
		const getSubscribedState = (keys) => {
			const stateChange = {};
			keys.map((key) => {
				if(subscribedStoreKeys.indexOf(key) !== -1) {
					stateChange[subscribeTo[key]] = this.state.get(key);
				}
			});
			return stateChange;
		}
		return {
			getInitialState() {
				return getSubscribedState(subscribedStoreKeys);
			},
			componentDidMount() {
				storeContext.eventHandler.on('change', (keys) => {
					this.setState(getSubscribedState(keys));
				});
			}
		}
	}
}

export default Store;