import {EventEmitter} from 'events';

class ActionSet {
	constructor(...actions) {
		this.actionList = [];
		this.eventHandler = new EventEmitter();
		actions.map((action) => {
			this.add(action);
		});
	}
	add(name) {
		if(typeof this[name] === 'undefined') {
			this[name] = this.trigger.bind(this, name);
			this.actionList.push(name);
		}
		else throw Error(`You cannot use this for Action name : ${name}`);
	}
	trigger(name, payload) {
		this.eventHandler.emit('action', {name, payload});
	}
}

export default ActionSet;