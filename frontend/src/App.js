import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home, TrackList, PlayerControls, AddSong } from './components';
import { MusicPlayerProvider } from './context/MusicPlayerContext';

const Player = () => (
	<div className='container'>
		<TrackList />
		<PlayerControls />
	</div>
);

const App = () => {
	return (
		<MusicPlayerProvider>

			<div>
				<nav className = 'navbar navbar-expand navbar-dark bg-dark'>
					<div className = 'navbar-nav mr-auto'>
						<li className = 'nav-item'>
							<Link to = {'/'} className = 'nav-link'>
									Home
							</Link>
						</li>

						<li className = 'nav-item'>
							<Link to = {'/musicplayer'} className = 'nav-link'>
									Music Player
							</Link>
						</li>

						<li className = 'nav-item'>
							<Link to = {'/addsong'} className = 'nav-link'>
									Add Song
							</Link>
						</li>

					</div>
				</nav>
			</div>

			<div className='container mt-3'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/musicplayer' component={Player} />
					<Route path='/addsong' component={AddSong} />
				</Switch>
			</div>

		</MusicPlayerProvider>
	);
};

export default App;
