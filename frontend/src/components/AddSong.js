import React, { useState } from 'react';

import useMusicPlayer from '../hooks/useMusicPlayer';

const AddSong = () => {
	const initialState = { name: '', description: '', songFile: null };
	const [song, setSong] = useState(initialState);
	const [submitted, setSubmitted] = useState(false);
	const [submittedResponse, setSubmittedResponse] = useState('');
	const { songMethod } = useMusicPlayer();

	const handleInputChange = e =>
		setSong({ ...song, [e.target.name]: e.target.value });

	const handleFileChange = event => setSong({ ...song, songFile: event.target.files[0] });

	const newSong = () => {
		setSong(initialState);
		setSubmitted(false);
	};

	const saveSong = async () => {
		const formData = new FormData();

		formData.append('name', song.name);
		formData.append('description', song.description);
		formData.append('songFile', song.songFile);

		const message = await songMethod('addSong')(formData);
		setSong(initialState);
		setSubmittedResponse(message.response.statusText);
		setSubmitted(true);
	};

	return (
		<div className='submit-form'>
			{submitted ? (
				<div>
					<h4>{submittedResponse}</h4>
					<button className='btn btn-success' onClick={newSong}>
            Add
					</button>
				</div>
			) : (
				<div>
					<div className='form-group'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							required
							value={song.name}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='description'>Description</label>
						<input
							type='text'
							className='form-control'
							id='description'
							name='description'
							value={song.description}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='title'>File</label>
						<input
							type='file'
							className='form-control'
							id='song-file'
							name='song-file'
							accept='.mp3'
							required
							value={song.file}
							onChange={handleFileChange}
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
