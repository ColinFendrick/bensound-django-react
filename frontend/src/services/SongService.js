import http from '../http-common';

const getAll = () => http.get('/api/songs');

const get = id => http.get(`/api/songs/${id}/`);

const addSong = data => http.post('/api/songs/', data);

const updateSong = data => http.patch(`/api/songs/${data.id}/`, data);

const deleteSong = data => http.delete(`/api/songs/${data.id}`);

export default {
	getAll,
	get,
	addSong,
	updateSong,
	deleteSong
};

