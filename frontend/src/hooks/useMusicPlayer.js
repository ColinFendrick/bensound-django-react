import { useContext } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerContext';

import SongDataService from '../services/SongService';

const useMusicPlayer = () => {
	const [state, setState] = useContext(MusicPlayerContext);

	const playTrack = ix => {
		if (ix === state.currentTrackIndex) {
			togglePlay();
		} else {
			state.audioPlayer.pause();
			state.audioPlayer = new Audio(state.tracks[ix].songFile);
			state.audioPlayer.play();
			setState(state => ({ ...state, currentTrackIndex: ix, isPlaying: true }));
		}
	};

	const togglePlay = () => {
		if (state.isPlaying) {
			state.audioPlayer.pause();
		} else {
			state.audioPlayer.play();
		}
		setState(state => ({ ...state, isPlaying: !state.isPlaying }));
	};

	const playPreviousTrack = () => {
		const newIndex = ((state.currentTrackIndex + -1) % state.tracks.length + state.tracks.length) % state.tracks.length;
		playTrack(newIndex);
	};

	const playNextTrack = () => {
		const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
		playTrack(newIndex);
	};

	const songMethod = method => async data => {
		try {
			const res = await SongDataService[method](data);

			if (method === 'updateSong') console.log('songmethod', res);

			state.retrieveSongs();
			return ({
				response: { statusText: `${res.data.name || ''} ${method.replace('Song', '')} ran correctly correctly` },
				serverResponse: res || null
			});
		} catch (e) {
			return e;
		}
	};

	return {
		songMethod,
		playTrack,
		togglePlay,
		currentTrackName: state.currentTrackIndex !== null && state.tracks[state.currentTrackIndex]?.name,
		trackList: state.tracks,
		isPlaying: state.isPlaying,
		retrieveError: state.retrieveError,
		playPreviousTrack,
		playNextTrack
	};
};

export default useMusicPlayer;
