import React from 'react';
import flux from '../flux';

const ImageList = React.createClass({
	mixins: [flux.storeMixin('main', {results: 'results'})],
  render() {
      return (
          <ul className="image-list">
            {this.state.results.map((result, index) => {
            	return <li key={'image_' + index}><a href={result.url} style={{backgroundImage: `url(${result.thumbnail})`}}></a></li>
            })}
          </ul>
      );
  }

});

export default ImageList;
