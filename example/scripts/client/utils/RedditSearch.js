import co from 'co';
import {EventEmitter} from 'events';
class RedditSearch extends EventEmitter {

	constructor(maxResults) {
		this.maxResults = maxResults;
		this.id = 0;
	}

	search(keyword) {
		const searchId = ++this.id;
		this.emit('reset');
		const _this = this;
		co(function* () {
			let resultsCount = 0;
			let after;
			while(resultsCount < _this.maxResults && after !== null && searchId === _this.id) {
				const data = yield fetch(`http://www.reddit.com/search.json?sort=new&q=${keyword}` + (after ? `&after=${after}` : ''));
				const listing = yield data.json();
				after = listing.data.after;
				if(searchId === _this.id) listing.data.children.map(entry => entry.data)
				.filter(result => /\.(jpg|jpeg|gif|png)$/.test(result.thumbnail))
				.map(result => {
					if(resultsCount < _this.maxResults) {
						resultsCount++;
						_this.emit('result', result);
					}
				});
			}
			if(searchId === _this.id) _this.emit('end');
		});
	}
}

export default RedditSearch;
