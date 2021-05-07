const user = require('../helpers/user');
const term = require('terminal-kit').terminal;
const space = ' ';
const padding = 2;

const center = 'center';
const underline = 'underline';
const uppercase = 'uppercase';
const lowercase = 'lowercase';

class Line {
    
    constructor(line, decorations=[]) {
        this.line = this._replaceVariables(line);
        this.spaces = ['',''];
        this.decorations = decorations.sort();
        this.center = this._isCenter();
        this.lineWidth = this.line.length;
        this.terminalWidth = this._getTerminalWidth();
        this.underline = '';
        this._applyDecorations();
    }

    getLine() {
        return [
            this.line,
            this.underline
        ];
    }

    uppercaseText() {
        this.line = this.line.toUpperCase();
    }

    lowercaseText() {
        this.line = this.line.toLowerCase();
    }

    underlineText() {
        this.underline = this.spaces[0] + this._createUnderline() + this.spaces[1];
    }

    _isCenter() {
        return this.decorations.indexOf(center) != -1;
    }

    _applyDecorations() {
        this._setSpaces();
        this._changeCase();
        this._changeUnderline();
    }

    _replaceVariables(line) {
        let currentUser = user.getUserInfo();
        for (const [key, value] of Object.entries(currentUser)) {
            line = line.replaceAll('{{'+key+'}}', value);
        }
        return line;
    }

    _changeCase() {
        if (this._isUppercase()) {
            this.uppercaseText();
        }
        if (this._isLowercase()) {
            this.lowercaseText();
        }
    }

    _isUppercase() {
        return this.decorations.indexOf(uppercase) != -1;
    }

    _isLowercase() {
        return this.decorations.indexOf(lowercase) != -1;
    }

    _isUnderlined() {
        return this.decorations.indexOf(underline) != -1;
    }

    _changeUnderline() {
        if (this._isUnderlined()) {
            this.underlineText();
        }
    }

    _createUnderline() {
        let underline = '';
        for (let i=0; i<this.lineWidth; i++) {
            underline += '-';
        }
        return underline;
    }

    _setSpaces() {
        if (this.center) {
            this._createCenterSpaces();
        } else {
            this._createLeftAlignSpaces();
        }
        this.line = this.spaces[0] + this.line + this.spaces[1];
    }

    _createCenterSpaces() {
        let left = Math.floor((this.terminalWidth - this.lineWidth) / 2);
        let right = this.terminalWidth - (left + this.lineWidth);
        this.spaces = [
            this._createSpace(left),
            this._createSpace(right)
        ];
    }

    _createLeftAlignSpaces() {
        let right = this.terminalWidth - this.lineWidth;
        this.spaces = [
            this._createSpace(padding),
            this._createSpace(right - padding)
        ];
    }

    _createSpace(n) {
        let spaces = '';
        for (let i = 0; i < n; i++) {
            spaces += space;
        }
        return spaces;
    }

    _getTerminalWidth() {
        return term.width == undefined ? 100 : term.width;
    }
}

module.exports.Line = Line;
