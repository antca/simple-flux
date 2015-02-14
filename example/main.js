import {ActionSet, Store} from '..';
import * as React from 'react';
import mainActions from './mainActions';
import mainStore from './mainStore';

/*
The component can now register to a store via a mixin and specifies the values he needs on his own state.
{storeKey: 'componentStateKey', ...}.
*/
const Main = React.createClass({
	mixins: [mainStore.mixin({text: 'text'})],
	updateValue(event) {
		this.setState({
			currentValue: event.target.value
		});
	},
	setValue() {
		mainActions.updateText(this.state.currentValue);
	},
	render() {
		return (
			<div>
				<h1>{this.state.text}</h1>
				<input ref="myText" type="text" defaultValue={this.state.text} onChange={this.updateValue}/>
				<input type="button" onClick={this.setValue} value="Set"/>
			</div>
		);
	}
});

React.render(<Main />, document.body);
