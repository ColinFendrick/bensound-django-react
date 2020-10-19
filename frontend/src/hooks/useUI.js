import { useContext } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerContext';

const useUI = () => {
	const [state, setState] = useContext(MusicPlayerContext);

	const toggleModal = ix => {
		if (state.isPlaying) {
			state.audioPlayer.pause();
		}

		setState({ ...state, modal: !state.modal, idUnderRevision: ix });
	};

	return {
		toggleModal,
		modal: state.modal,
		idUnderRevision: state.idUnderRevision
	};
};

export default useUI;
