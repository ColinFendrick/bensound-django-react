import { useContext } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerContext';

const useUI = () => {
	const [state, setState] = useContext(MusicPlayerContext);

	const toggleModal = (children = null) => stateArgs => {
		if (state.isPlaying) {
			state.audioPlayer.pause();
		}

		setState({
			...state,
			modalChildren: children,
			...stateArgs
		});
	};

	return {
		toggleModal,
		idUnderRevision: state.idUnderRevision,
		modalChildren: state.modalChildren
	};
};

export default useUI;
