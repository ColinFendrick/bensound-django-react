import http from '../http-common';

const getAll = () => http.get('/bensounds');

export default {
	getAll
};
