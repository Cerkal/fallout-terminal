const DATE = new Date();

const getFullDate = () => {
    return getMonth() + '.' + getDay() + '.' + getYear();
};

const getMonth = () => {
    return (DATE.getMonth() > 8) ? (DATE.getMonth() + 1) : ('0' + (DATE.getMonth() + 1));
};

const getDay = () => {
    return (DATE.getDate() > 9) ? DATE.getDate() : ('0' + DATE.getDate());
};

const getYear = () => {
    return DATE.getFullYear();
};

exports.getFullDate = getFullDate;
exports.getMonth = getMonth;
exports.getDay = getDay;
exports.getYear = getYear;
