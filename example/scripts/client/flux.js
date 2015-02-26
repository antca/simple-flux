import SimpleFlux from '../../..';
import RedditSearch from './utils/RedditSearch';

const flux = new SimpleFlux();

flux.createStore('main', {
	init() {
		this.setState({
			results: []
		});
		this.reddit = new RedditSearch(200);
		this.reddit.on('result', (result) => {
			const results = this.state.head.get('results');
			results.push(result);
			this.setState({results});
		});
		this.reddit.on('end', () => console.log("Search finshed !"));
		this.reddit.on('reset', () => {
			this.setState({results: []});
		});
	},
	onSearchInputChanged(data) {
		if(this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => this.reddit.search(data), 200);
	}
});



export default flux;
