import React, { useState, useEffect, useCallback } from 'react';

import SongDataService from '../services/SongService';

const MusicPlayerContext = React.createContext([{}, () => {}]);

const MusicPlayerProvider = props => {

	const retrieveSongs = useCallback(() => {
		(async () => {
			try {
				const response = await SongDataService.getAll();
				setState(state => ({ ...state, tracks: response.data, retrieveError: '' }));
			} catch (e) {
				setState(state => ({ ...state, retrieveError: e.response.statusText }));
			}
		})();
	}, []);

	useEffect(() => retrieveSongs(), [retrieveSongs]);

	const [state, setState] = useState({
		audioPlayer: new Audio(),
		tracks: [],
		currentTrackIndex: null,
		isPlaying: false,
		retrieveError: '',
		retrieveSongs
	});

	return (
		<MusicPlayerContext.Provider value={[state, setState]}>
			{props.children}
		</MusicPlayerContext.Provider>
	);
};

export { MusicPlayerContext, MusicPlayerProvider };
