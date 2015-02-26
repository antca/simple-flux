import React from 'react';
import SearchBar from './SearchBar.jsx';
import ImageList from './ImageList.jsx';


const Root = React.createClass({
	render() {
		return (
			<div>
			  <SearchBar />
			  <ImageList />
			</div>
		);
	}
});

export default Root;
