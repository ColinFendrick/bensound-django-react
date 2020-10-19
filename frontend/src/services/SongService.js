import http from '../http-common';

const getAll = () => http.get('/songs');

const get = id => http.get(`/songs/${id}/`);

const addSong = data => http.post('/songs/', data);

const updateSong = data => http.patch(`/songs/${data.id}/`, data);

const deleteSong = data => http.delete(`/songs/${data.id}`);

export default {
	getAll,
	get,
	addSong,
	updateSong,
	deleteSong
};

