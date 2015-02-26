import {Dispatcher} from 'flux';
import Store from './Store';

class SimpleFlux {

	constructor() {
		this.stores = {};
		this.dispatcher = new Dispatcher();
	}

	createStore(name, config) {
		if(this.stores[name]) throw Error('A Store with this name already exists !');
		this.stores[name] = new Store(config, this.dispatcher);
	}

	storeMixin(name, mapping) {
		if(!this.stores[name]) throw Error('There is no store with this name !');
		return this.stores[name].mixin(mapping);
	}

	action(type, data) {
		if(!/^[A-Z0-9_]*$/.test(type)) throw Error('Action name must be in all caps !');
		this.dispatcher.dispatch({type, data});
	}
}

export default SimpleFlux;
