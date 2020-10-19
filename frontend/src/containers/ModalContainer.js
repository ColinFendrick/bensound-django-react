import React from 'react';
import { Modal } from 'reactstrap';

import useUI from '../hooks/useUI';

const ModalContainer = props => {
	const { toggleModal, modalChildren } = useUI();

	return (
		<Modal isOpen={!!modalChildren} toggle={() => toggleModal(null)()}>
			{props.children}
		</Modal>
	);
};

export default ModalContainer;
