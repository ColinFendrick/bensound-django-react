import React, { useEffect, useState } from 'react';
import {
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Spinner
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import useUI from '../../hooks/useUI';
import useMusicPlayer from '../../hooks/useMusicPlayer';

const BensoundDetailsModal = ({ song }) => {
	const initialContextState = {
		audioPlayer: new Audio(),
		isPlaying: false,
		currentTrackIndex: null
	};
	const { toggleModal } = useUI();
	const [hasLoaded, setHasLoaded] = useState(true);
	const [submittedResponse, setSubmittedResponse] = useState('');
	const {
		isPlaying,
		streamTrack,
		downloadTrack,
		modifyContextState
	} = useMusicPlayer();

	const handleDownload = async title => {
		setHasLoaded(false);
		const res = await downloadTrack(title);
		setHasLoaded(true);
		setSubmittedResponse(res.data.message || res.data);
	};

	const stream = async title => {
		const res = await streamTrack(title);
		setSubmittedResponse(res.data.message || res.data);
	};

	const goBack = () => {
		setHasLoaded(true);
		setSubmittedResponse('');
	};

	// eslint-disable-next-line
	useEffect(() => modifyContextState(initialContextState), []);

	return (
		<>
			<ModalHeader toggle={() => toggleModal(null)(initialContextState)}> {song.title} </ModalHeader>
			{submittedResponse && hasLoaded ? (
				<>
					<ModalBody>
						<h4>{submittedResponse}</h4>
						<div>
							If you downloaded the song, it is saved in the root of your backend project.
							You may now upload it to play it from the local player,
							or you may return to the song and stream it.
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color='primary' onClick={goBack}>
						Return to Song
						</Button>

						<Button color='danger' onClick={() => toggleModal(null)()}>
						Close
						</Button>
					</ModalFooter>
				</>
			)
				: !hasLoaded ? <Spinner animation='border' /> :
					<>
						<ModalBody>
							<p>
								<strong>Description: </strong>
								<small>{song.description}</small>
							</p>

							<p>
								<strong>Length: </strong>
								<small>{song['length']}</small>
							</p>

							{song.for_download && (
								<div className='box controls has-background-grey-dark'>
									<div className='current-track has-text-light'>
										<div className={`marquee ${isPlaying ? 'is-playing' : 'not-playing'}`}>
											<p>{song.title}</p>
										</div>
									</div>
									<div>
										<button
											className='button has-text-light has-background-grey-dark'
											onClick={() => stream(song.title)}
										>
											{isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
										</button>
									</div>
								</div>
							)}

						</ModalBody>
						<ModalFooter>
							<Button color='success' onClick={() => handleDownload(song.title)} disabled={!song.for_download}>
								Download
							</Button>

							<Button color='danger' onClick={() => toggleModal(null)()}>
								Close
							</Button>
						</ModalFooter>
					</>
			}
		</>
	);
};

export default BensoundDetailsModal;
