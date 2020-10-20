import { useContext } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerContext';

import SongDataService from '../services/SongService';
import BenSoundDataService from '../services/BenSoundService';

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

	const streamTrack = url => {
		if (state.currentTrackIndex === -999) {
			togglePlay();
		} else {
			state.audioPlayer = new Audio(url);
			state.audioPlayer.play();
			setState({ ...state, isPlaying: true, currentTrackIndex: -999 });
		}
	};

	const downloadTrack = async title => {
		// Shut off the player if it's playing
		if (state.isPlaying) {
			state.audioPlayer.pause();
			setState({ ...state, isPlaying: false, currentTrackIndex: null });
		}

		try {
			const song = await BenSoundDataService.download(title);
			return song;
		} catch (e) {
			return e;
		}
	};

	const togglePlay = () => {
		if (state.isPlaying) {
			state.audioPlayer.pause();
		} else {
			state.audioPlayer.play();
		}
		setState({ ...state, isPlaying: !state.isPlaying });
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
			state.retrieveSongs();
			return ({
				response: { statusText: `${res.data.name || ''} ${method.replace('Song', '')} ran correctly correctly` },
				serverResponse: res || null
			});
		} catch (e) {
			return e;
		}
	};

	const modifyContextState = stateArgs => setState({ ...state, ...stateArgs });

	return {
		songMethod,
		playTrack,
		streamTrack,
		downloadTrack,
		togglePlay,
		currentTrackName: state.currentTrackIndex !== null && state.tracks[state.currentTrackIndex]?.name,
		trackList: state.tracks,
		isPlaying: state.isPlaying,
		retrieveError: state.retrieveError,
		playPreviousTrack,
		playNextTrack,
		modifyContextState
	};
};

export default useMusicPlayer;
