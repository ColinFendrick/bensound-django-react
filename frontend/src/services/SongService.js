import http from '../http-common';

const getAll = () => http.get('/songs');

const get = data => http.get(`/songs/${data.id}/`);

const addSong = data => http.post('/songs/', data);

const updateSong = data => http.put(`/songs/${data.id}`, data);

const deleteSong = data => http.delete(`/songs/${data.id}`);

export default {
	getAll,
	get,
	addSong,
	updateSong,
	deleteSong
};

