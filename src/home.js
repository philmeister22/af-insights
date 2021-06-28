import React, { Component } from 'react';
	class Home extends Component {
		render() {
			return (
				<div>
					<h1>Pagina iniziale</h1>
					<p>Benvenuto nella pagina iniziale.{props.username}</p>
				</div>
			);
		}
	}
	export default Home;