import React, { useState } from 'react';
import ANewBeginning from '../assets/bensound-anewbeginning.mp3';
import Ukelele from '../assets/bensound-ukulele.mp3';
import CreativeMinds from '../assets/bensound-creativeminds.mp3';

const MusicPlayerContext = React.createContext([{}, () => {}]);

const MusicPlayerProvider = props => {

	const [state, setState] = useState({
		audioPlayer: new Audio(),
		tracks: [
			{
				name: 'Ukelele',
				file: Ukelele
			},
			{
				name: 'Creative Minds',
				file: CreativeMinds
			},
			{
				name: 'A New Beginning',
				file: ANewBeginning
			}
		],
		currentTrackIndex: null,
		isPlaying: false
	});
	return (
		<MusicPlayerContext.Provider value={[state, setState]}>
			{props.children}
		</MusicPlayerContext.Provider>
	);
};

export { MusicPlayerContext, MusicPlayerProvider };
