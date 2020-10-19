
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import useUI from '../hooks/useUI';
import {
	Home,
	TrackList,
	Modal,
	SongList,
	PlayerControls,
	AddSong
} from '../components';


const Player = () => (
	<div className='container'>
		<TrackList />
		<PlayerControls />
	</div>
);

const Container = () => {
	const { modal } = useUI();

	return (
		<>
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

						<li className = 'nav-item'>
							<Link to = {'/bensound'} className = 'nav-link'>
									Song List from BenSounds
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
					<Route path='/bensound' component={SongList} />
				</Switch>
			</div>

			{modal ? <Modal /> : null}
		</>
	);
};

export default Container;
