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
			console.log(state.tracks[ix].songFile);
			// state.audioPlayer = new Audio(state.tracks[ix].songFile.replace('http://localhost:8000/', '../../../backend/'));
			// console.log(state.tracks[ix].songFile.replace('http://localhost:8000/', '../../../backend/'));
			// state.audioPlayer = new Audio(transformedTrackList[ix].songFile);
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

	const addSong = async data => {
		try {
			const res = await SongDataService.addSong(data);
			state.retrieveSongs();
			return ({ response: { statusText: `${res.data.name} added correctly` }});
		} catch (e) {
			return e.response.statusText;
		}
	};

	return {
		addSong,
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
