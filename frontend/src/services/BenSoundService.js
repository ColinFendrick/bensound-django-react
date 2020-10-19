import http from '../http-common';

const getAll = () => http.get('/bensounds');

const getByTitle = title => http.get(`/bensounds/${title}`);

export default {
	getAll,
	getByTitle
};
