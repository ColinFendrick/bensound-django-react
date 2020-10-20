import http from '../http-common';

const getAll = () => http.get('/bensounds');

const getByTitle = title => http.get(`/bensounds/${title}`);

const download = title => http.get(`/bensounds/download/${title}`);

export default {
	getAll,
	getByTitle,
	download
};
