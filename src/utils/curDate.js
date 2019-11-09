
module.exports.curDate = () => {
    // Create a date
    const today = new Date();
    // Format it to 'dd/mm/yyyy hh:mm:ss'
    return  twoDigits(today.getDate()) + '/' +
            twoDigits(today.getMonth() + 1) + '/' +
            today.getFullYear() + ' ' +
            twoDigits(today.getHours()) + ':' + 
            twoDigits(today.getMinutes()) + ':' + 
            twoDigits(today.getSeconds());
}

function twoDigits(number) {
    // Makes sure number has 2 digits
    return ('0' + number).slice(-2);
}
