import React, { useState } from 'react';

import useMusicPlayer from '../hooks/useMusicPlayer';

const AddSong = () => {
	const [song, setSong] = useState({ name: '' });
	const [submitted, setSubmitted] = useState(false);
	const { addSong } = useMusicPlayer();

	const handleInputChange = event => {
		const {
			name,
			value
		} = event.target;

		setSong({ ...song, [name]: value });
	};


	const newSong = () => {
		setSong({ name: '' });
		setSubmitted(false);
	};

	const saveSong = () => {
		addSong(song);
		setSong({ name: '' });
		setSubmitted(true);
	};

	return (
		<div className='submit-form'>
			{submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className='btn btn-success' onClick={newSong}>
            Add
					</button>
				</div>
			) : (
				<div>
					<div className='form-group'>
						<label htmlFor='title'>Name</label>
						<input
							type='text'
							className='form-control'
							id='name'
							required
							value={song.name}
							onChange={handleInputChange}
							name='name'
						/>
					</div>

					<button onClick={saveSong} className='btn btn-success'>
            Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default AddSong;
