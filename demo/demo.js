const $ = require('jquery');
const InputLength = require('../index');

$(function () {
    const inputLength = new InputLength($('html'));

    
    inputLength.init({
      targetSelector: '.js-inputLengthWarning',
      messageClass: 'help-block'
    });
});