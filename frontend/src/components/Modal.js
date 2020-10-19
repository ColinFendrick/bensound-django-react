import React, { useState, useEffect } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	Label,
	Spinner
} from 'reactstrap';

import useUI from '../hooks/useUI';
import useMusicPlayer from '../hooks/useMusicPlayer';

const ModalComponent = () => {
	const { songMethod } = useMusicPlayer();
	const { toggleModal, modal, idUnderRevision } = useUI();
	const [hasLoaded, setHasLoaded] = useState(false);
	const [songToEdit, updateSongToEdit] = useState({
		name: '', description: '', id: null
	});
	const [submittedResponse, setSubmittedResponse] = useState('');

	const handleChange = e =>
		updateSongToEdit({ ...songToEdit, [e.target.name]: e.target.value });


	useEffect(() => {
		(async () => {
			setHasLoaded(false);
			const res = await songMethod('get')(idUnderRevision);

			setHasLoaded(true);
			const { name, description, id } = res.serverResponse.data;
			updateSongToEdit({ name, description, id });
		})();
	}, [idUnderRevision]);

	const methodSong = method => async () => {
		setHasLoaded(false);
		const result = await songMethod(method)(songToEdit);
		updateSongToEdit({});
		setHasLoaded(true);
		setSubmittedResponse(result.response.statusText);
	};

	return (
		<Modal isOpen={modal} toggle={() => toggleModal(null)}>
			<ModalHeader toggle={toggleModal}> Edit Song </ModalHeader>
			{submittedResponse && hasLoaded ? <h4>{submittedResponse}</h4>
				: !hasLoaded ? <Spinner animation="border" />  :
					<>
						<ModalBody>
							<Form>
								<FormGroup>
									<Label for='name'>Title</Label>
									<Input
										type='text'
										name='name'
										value={songToEdit.name}
										onChange={handleChange}
										placeholder='Song Name'
									/>
								</FormGroup>

								<FormGroup>
									<Label for='description'>Description</Label>
									<Input
										type='text'
										name='description'
										value={songToEdit.description}
										onChange={handleChange}
										placeholder='Enter song description'
									/>
								</FormGroup>

							</Form>
						</ModalBody>
						<ModalFooter>
							<Button color='success' onClick={() => methodSong('updateSong')(songToEdit)}>
              Save
							</Button>

							<Button color='danger' onClick={() => methodSong('deleteSong')(songToEdit)}>
              Delete
							</Button>
						</ModalFooter>
					</>}
		</Modal>
	);
};

export default ModalComponent;
