const React = require('react');
const tileData = require('../../data/tile.json')

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tiles: [] };
	}
	componentDidMount() {
		this.setState({
			tiles: tileData.tiles
		})
	}

	componentWillUnMount(){
		console.log("unmounted!");
	}

	render() {
		return (

			<div>
			{this.state.tiles.map(tile =>
			 	<div className="col-xs-6 col-sm-12 col-md-6 tile-container" key={tile.id} id={`tile-${tile.id}`}>
			 		{/*<img className="img-responsive" src={`./sites/all/themes/cure/public/images/home/tiles/${tile.imgSrc}`} alt=""/>*/}
				 	<div className="content-container">
				 		<h2>{tile.h2}</h2>
				 		<h3>{tile.h3}</h3>
				 		<a className="hover-state-2" href={tile.linkSrc}>learn more</a>
				 	</div>
			 	</div>
			)}
			</div>
		);
	}
}

export default Tile;