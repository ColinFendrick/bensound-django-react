import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="container">
			<header className="jumbotron">
				<h3>
					<strong>Home</strong>
				</h3>
			</header>

			<p>
				<Link to='/musicplayer'>
          Go to music player
				</Link>
			</p>

		</div>
	);
};

export default Home;
