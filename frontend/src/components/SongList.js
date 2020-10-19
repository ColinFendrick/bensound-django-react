import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

import BenSoundDataService from '../services/BenSoundService';

const SongList = () => {
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
				setSubmitted(e.response.statusText);
			}
		})();
	}, []);

	return (
		<div>
			{!hasLoaded ? (
				<Spinner animation="border" />
			) : (
				<div>
					<h4>{submitted || ''}</h4>
					{songList.map((song, index) => (
						<div className='box' key={index}>
							<div className='song-title'>
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
