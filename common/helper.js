exports.require = function (filedName) {
	var status = { code: '281', message: filedName + 'is required.' };
	return status;
}

exports.login = function (message) {
	var status = { code: '282', message: message };
	return status;
}

exports.success = function () {
	var status = { code: '200', message: '' };
	return status;
}

exports.fail = function (err) {
	var status = { code: '280', message: '', error: err };
	return status;
}

exports.isEmpty = function (str) {
    return (!str || 0 === str.length);
}
