const lineImport = require('../classes/line');
const Line = lineImport.Line;

const createLines = (lines) => {
	let results = [];
	lines.forEach(line => {
		if (typeof line == 'string') {
			results.push(createLine(line, ['left']));
		} else {
			results.push(recur(line));
		}
	});
	return results;
}

const createLine = (line, decorations=[]) => {
	return createdLine = new Line(line, decorations).getLine();
}

const recur = (obj, decorations=[]) => {
	for (const [key, value] of Object.entries(obj)) {
		decorations.push(key);
		if (typeof value == 'string') {
			return createLine(value, decorations);
		} else {
			return recur(value, decorations);
		}
	}
}

exports.createLines = createLines;
