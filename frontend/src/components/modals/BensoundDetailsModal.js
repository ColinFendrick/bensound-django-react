import React from 'react';
import {
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from 'reactstrap';

import useUI from '../../hooks/useUI';

const BensoundDetailsModal = ({ song }) => {
	const { toggleModal } = useUI();

	return (
		<>
			<ModalHeader toggle={() => toggleModal(null)()}> {song.title} </ModalHeader>
			<ModalBody>
				<p>
					<strong>Description: </strong>
					<small>{song.description}</small>
				</p>

				<p>
					<strong>Length: </strong>
					<small>{song['length']}</small>
				</p>
			</ModalBody>
			<ModalFooter>
				<Button color='success' onClick={() => {}} disabled={!song.for_download}>
          Download
				</Button>

				<Button color='danger' onClick={() => toggleModal(null)()}>
          Close
				</Button>
			</ModalFooter>
		</>
	);
};

export default BensoundDetailsModal;
