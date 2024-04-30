const $ = require('jquery');

import InputLength from '../index';

$(function () {
    const inputLength = new InputLength($('html'));

    inputLength.init({
      targetSelector: '.js-inputLengthWarning',
      messageClass: 'help-block'
    });
});