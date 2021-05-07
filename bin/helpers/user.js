const os = require("os");
const date = require('./date');
const user = os.userInfo();

const getUserInfo = () => {
	user.name = getName(user);
	user.year = date.getYear();
	user.fulldate = date.getFullDate();
	user.hostname = os.hostname().toUpperCase();
	return user;
}

const getHomeDir = () => {
	return user.homedir;
}

const getName = user => {
	let username = 'Current User';
	if (user.username != undefined) {
		username = user.username.toLowerCase();
		let usernameArray = username.split(/[\s.]+/);
		usernameArray = usernameArray.map(part => {
			return part.charAt(0).toUpperCase() + part.slice(1);
		});
		username = usernameArray.join(' ');
	}
	return username;
}

exports.getUserInfo = getUserInfo;
exports.getHomeDir = getHomeDir;