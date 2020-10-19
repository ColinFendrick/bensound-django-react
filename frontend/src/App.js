import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MusicPlayerProvider } from './context/MusicPlayerContext';

import { Container } from './containers';

const App = () => (
	<MusicPlayerProvider>
		<Container />
	</MusicPlayerProvider>
);

export default App;
