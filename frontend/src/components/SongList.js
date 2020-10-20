import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

import { BensoundDetailsModal } from './modals';

import BenSoundDataService from '../services/BenSoundService';
import useUI from '../hooks/useUI';

const SongList = () => {
	const { toggleModal } = useUI();
	const [songList, updateSongs] = useState([]);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [submitted, setSubmitted] = useState('');

	useEffect(() => {
		(async () => {
			try {
				setHasLoaded(false);
				const res = await BenSoundDataService.getAll();

				setHasLoaded(true);
				setSubmitted('Songs have loaded from bensounds');
				updateSongs(res.data.songList);
			} catch (e) {
				setHasLoaded(true);
				setSubmitted(e.message);
			}
		})();
	}, []);

	const getDetails = async title => {
		try {
			setHasLoaded(false);
			const dashTitle = title.replace(/\s+/g, '-').toLowerCase();
			const res = await BenSoundDataService.getByTitle(dashTitle);
			setHasLoaded(true);
			setSubmitted(`${title} has loaded details`);
			toggleModal(<BensoundDetailsModal song={res.data.properties} />)();
		} catch (e) {
			setHasLoaded(true);
			setSubmitted(e.message || e.response.statusText);
		}
	};

	return (
		<div>
			{!hasLoaded ? (
				<Spinner animation='border' />
			) : (
				<div>
					<h4>{submitted || ''}</h4>
					{songList.map((song, index) => (
						<div className='box' key={index}>
							<div className='song-title' onClick={() => getDetails(song)}>
								{song}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SongList;
