/**
 * Input Length Warning
 */

'use strict';

import $ from 'jquery';

class InputLength {

  /**
   * @constructor
   */
  constructor($html) {
    this.$html = $html,
    this.baseClass = 'inputLength';
    this.labelClass = 'inputLength__label';
    this.okClass = 'inputLength--ok';
    this.warnClass = 'inputLength--warn';
    this.stopClass = 'inputLength--stop';
    this.warnThreshold = 70;
  }

  /**
   * Initialise behaviour on target element
   */
  init (options = {}) {
    let _self = this;

    // If no selector is passed, we'll presume someone is attempting to implement this and failing
    if (typeof options.targetSelector === 'undefined') {
      throw new Error('Attempting to initialise input length warning but no selector has been provided');
    }

    // Find the elements needing the warning
    let targets = this.$html.find(options.targetSelector);

    // If no targets match the target selector, fail silently
    if (!targets.length) {
      return false;
    }

    // Handle any supplied options
    if (typeof options.baseClass != 'undefined') {
      _self.baseClass = options.baseClass;
    }

    if (typeof options.baseClass != 'undefined') {
      _self.baseClass = options.baseClass;
    }

    if (typeof options.labelClass != 'undefined') {
      _self.labelClass = options.labelClass;
    }

    if (typeof options.okClass != 'undefined') {
      _self.okClass = options.okClass;
    }

    if (typeof options.warnClass != 'undefined') {
      _self.warnClass = options.warnClass;
    }

    if (typeof options.stopClass != 'undefined') {
      _self.stopClass = options.stopClass;
    }

    if (typeof options.warnThreshold != 'undefined') {
      _self.warnThreshold = options.warnThreshold;
    }

    targets.each(function() {
      _self.setInputLengthWarning(this)
    });
  }

  /**
   * 
   * @param {element} target A textarea instance
   */
  setInputLengthWarning(target) {
    let _self = this,
        $target = $(target),
        maxLength = target.getAttribute('maxlength'),
        ariaDescribedby = target.getAttribute('aria-describedby') ? target.getAttribute('aria-describedby') + ' ' : '',
        messageContainer = document.createElement('span'),
        guid = 'guid-' + Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    // Proceed only if we have a maxlength,
    if (maxLength === null) {
      return;
    }

    // Mark up the generated content with supplied options
    messageContainer.setAttribute('id', guid);
    messageContainer.setAttribute('aria-live', 'polite');
    messageContainer.classList.add(_self.baseClass);

    $target.attr('aria-describedby', ariaDescribedby + guid);
    $target.after(messageContainer);

    // Trigger the initial population of the message
    _self.updateRemaining(target, maxLength, messageContainer);

    // set up events
    $(target).on('input', function() {
      _self.updateRemaining(target, maxLength, messageContainer);
    });
  }

  /**
   * 
   * @param {element} target the input we're dealing with
   * @param {integer} maxLength the current max length of the target
   * @param {element} messageContainer element to populate with the message 
   */
  updateRemaining(target, maxLength, messageContainer) {
    let _self = this,
        curLength = target.value.length,
        percentUsed = (curLength / maxLength) * 100,
        count,
        countLabel,
        countLabelPlural,
        countLabelDescription;

    // Set status classes based on configurable thresholds
    if (percentUsed === 100) {
      messageContainer.classList.add(_self.stopClass);
      messageContainer.classList.remove(_self.warnClass, _self.okClass);
    }
    else if (percentUsed > _self.warnThreshold) {
      messageContainer.classList.add(_self.warnClass);
      messageContainer.classList.remove(_self.okClass, _self.stopClass)
    }
    else {
      messageContainer.classList.add(_self.okClass);
      messageContainer.classList.remove(_self.warnClass, _self.stopClass);
    }

    // construct the message label
    count = maxLength - curLength;
    countLabelPlural = (count === 1) ? '' : 's';
    countLabelDescription = (curLength === 0) ? 'allowed' : 'left';

    countLabel = '<span class="' + _self.labelClass + '">' + count + '</span> character' + countLabelPlural;
    messageContainer.innerHTML = countLabel + ' ' + countLabelDescription;
  }
}

export default InputLength;