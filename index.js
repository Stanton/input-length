const $ = require('jquery');
const InputLength = require('./dist/InputLength');

$(function () {
    const inputLength = new InputLength($('html'));

    
    inputLength.init({
      targetSelector: '.js-inputLengthWarning',
      messageClass: 'help-block'
    });
});
