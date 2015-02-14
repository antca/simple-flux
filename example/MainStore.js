import {Store} from './fluxounet';
import mainActions from './mainActions';

/*
A store has a state witch can be initialized and then can be changed with action handlers.
*/
const mainStore = new Store({
	initialState: {
		text: 'Default text !'
	},
	default: {
		onUpdateText(data) {
			this.setState({
				text: data
			});
		}
	}
});

/*
A store can register to multiple ActionSet and must choose a namespace where he will implement the handlers.
*/
mainStore.registerActionSet('default', mainActions);

export default mainStore;