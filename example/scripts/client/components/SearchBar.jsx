import React from 'react';
import flux from '../flux';

const SearchBar = React.createClass({
	onKeyUp(event) {
		flux.action('SEARCH_INPUT_CHANGED', event.target.value);
	},
    render() {
        return (
        	<div className="search-bar">
            	<input type="text" defaultValue="" placeholder="Search images" onKeyUp={this.onKeyUp} />
        	</div>
        );
    }

});

export default SearchBar;
