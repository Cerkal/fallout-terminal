#!/usr/bin/env node

const fs = require('fs');
const path = require("path");
const createLines = require('./helpers/line');
const parser = require('fast-xml-parser');
const user = require('./helpers/user');
const term = require('terminal-kit').terminal;
const appName = require('../package.json').name
const encoded = 'utf8';

let speed = 20;
let headerPath;

const main = () => {	
	setTerminal();
	setConfig();
	readXml();
}

const setTerminal = () => {
	term.grabInput({mouse: 'button'});
	term.on('key', function() {
		speed = 0;
	});
	term.fullscreen(1);
}

const setConfig = () => {
	let configPath = user.getHomeDir() + '/.' + appName + '/config.xml';
	if (fs.existsSync(configPath)) {
		try {
			let xmlData = fs.readFileSync(configPath, encoded)
			let config = parser.parse(xmlData).config;
			headerPath = config.headerPath;
			speed = config.speed != undefined ? config.speed : speed;
		} catch (err) {
			console.error('Could not find path to config.xml - PATH: ' + configPath + '\n\n\n\n');
		}
	}
}

const readXml = () => {
	let headerPath = getHeaderPath();
	fs.readFile(headerPath, encoded, function(err, xmlData) {
		if (err) throw err;
		let lines = getLinesFromXml(xmlData);
		let terminalOutput = getTerminalOutput(lines);
		printOutput(sanitizeArray(terminalOutput));
	});
}

const getHeaderPath = () => {
	let file = getXmlPath("./headers/header.xml");
	if (headerPath != undefined) file = headerPath;
	return file;
}

const getXmlPath = (file) => {
	return fileNamePath = path.join(__dirname, file);
}

const getLinesFromXml = xmlData => {
	let jsObj = parser.parse(xmlData);
	return jsObj.main.line;
}

const getTerminalOutput = lines => {
	let terminalOutput = createLines.createLines(lines);
	return terminalOutput;
}

const sanitizeArray = terminalOutput => {
	outputArray = [];
	terminalOutput.forEach(line => {
		outputArray.push(line[0]);
		if (line[1] != '') {
			outputArray.push(line[1]);
		}
	});
	return outputArray;
}

const printOutput = outputArray => {
	output = outputArray.join('');
	printLine(output).then(function() { 
		term.grabInput(false);	
	});
}

async function printLine(line) {
	for (let i = 0; i < line.length; i++) {
		let char = line[i];
		if (char != ' ') {
			await sleep(speed);
		}
		term(line[i]);
	}
	function sleep(ms) {
	  return new Promise((resolve) => {
	    setTimeout(resolve, ms);
	  });
	}   
}

main();

module.exports = main;
exports.term = term;