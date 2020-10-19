import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import useMusicPlayer from '../hooks/useMusicPlayer';
import useUI from '../hooks/useUI';
import { pipe } from '../helpers';

import { EditSongModal } from './modals';

const TrackList = () => {
	const { trackList, currentTrackName, playTrack, isPlaying, retrieveError } = useMusicPlayer();
	const { toggleModal } = useUI();

	return (
		<>
			{trackList.map((track, index) => (
				<div className='box' key={index}>
					<button className='button' onClick={() => playTrack(index)}>
						{currentTrackName === track.name && isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
					</button>
					<div className='song-title'>
						{track.name}
						<button className='badge badge-warning' onClick={() => toggleModal(<EditSongModal />)({ idUnderRevision: track.id })}>
							Edit
						</button>
					</div>
					{track.description && <p>
						<strong>Description: </strong>
						<small>{track.description}</small>
					</p>}
				</div>
			))}
			{retrieveError && retrieveError}
		</>
	);
};

export default TrackList;
