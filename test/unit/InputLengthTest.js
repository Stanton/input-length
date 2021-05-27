'use strict';

import $ from 'jquery';
import InputLength from '../../index';

describe('InputLength', () => {
    let $html,
        $body,
        inputLength;

    beforeEach(() => {
      $html = $('<div></div>');
      $body = $(`<body>
      <textarea id="alpha" class="qa-alpha" maxlength="4"></textarea>
      <textarea id="bravo" class="qa-bravo" maxlength="4" aria-describedby="foo"></textarea>
      <textarea id="charlie" data-foo="true" maxlength="1"></textarea>
      </body>`).appendTo($html);

      inputLength = new InputLength($html);
    });

    afterEach(() => {
      $body.empty();
    });


    describe('init()', () => {

      it('should throw an error if no selector is provided', () => {
        expect(() => {
          inputLength.init();
        }).to.throw('Attempting to initialise input length warning but no selector has been provided');
      });

      it('should add a message container after the target input', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        expect($html.find('.qa-alpha').next().hasClass('inputLength')).to.be.true;
      });

      it('should work with any selector, not just classes', () => {
        inputLength.init({
          targetSelector: '[data-foo=true]',
        });

        expect($html.find('#charlie').next().hasClass('inputLength')).to.be.true;
      });

    });


    describe('The message container', () => {

      it('should show mow many characters available', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        expect($html.find('.qa-alpha').next().text()).to.equal('4 characters allowed');
      });


      it('should be defined as a live region', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        expect($html.find('.qa-alpha').next().attr('aria-live')).to.not.be.undefined;
      });


      it('should add a guid ID to the container', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        expect($html.find('.qa-alpha').next().attr('id')).to.not.be.undefined;
      });


      it('should use a custom class if provided', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
          baseClass: 'foo',
        });

        expect($html.find('.qa-alpha').next().hasClass('foo')).to.be.true;
      });


      it('should init the message with the appropriate state class', () => {
        inputLength.init({
          targetSelector: '.qa-alpha'
        });

        expect($html.find('.qa-alpha').next().hasClass('inputLength--ok')).to.be.true;
      });


      it('should omit the default state class, if a custom class provided', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
          okClass: 'foo'
        });

        expect($html.find('.qa-alpha').next().hasClass('inputLength--ok')).to.be.false;
      });


      it('should init the message with the appropriate custom state class, if provided', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
          okClass: 'foo'
        });

        expect($html.find('.qa-alpha').next().hasClass('foo')).to.be.true;
      });


      it('should wrap the count with a targetable class', () => {
        inputLength.init({
          targetSelector: '.qa-alpha'
        });

        expect($html.find('.qa-alpha').next().find('span').hasClass('inputLength__label')).to.be.true;
      });


      it('should omit the default count class, if a custom class provided', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
          labelClass: 'foo'
        });

        expect($html.find('.qa-alpha').next().find('span').hasClass('inputLength__label')).to.be.false;
      });


      it('should wrap the count with a custom class, if provided', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
          labelClass: 'foo'
        });

        expect($html.find('.qa-alpha').next().find('span').hasClass('foo')).to.be.true;
      });

    });

    describe('The target input', () => {

      it('should add an aria-describedby attribute', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        expect($html.find('.qa-alpha').attr('aria-describedby')).to.not.be.undefined;
      });


      it('should not overwrite an existing aria-describedby attribute', () => {
        inputLength.init({
          targetSelector: '.qa-bravo',
        });

        expect($html.find('.qa-bravo').attr('aria-describedby')).to.contain('foo');
      });


      it('should match the aria-describedby attribute to the message container ID', () => {
        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        expect($html.find('.qa-alpha').attr('aria-describedby')).to.equal($html.find('.qa-alpha').next().attr('id'));
      });

    });


    describe('Filling the content to < warning threshold', () => {

      it('should decrement the counter', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('1').trigger(e);
        expect($html.find('.qa-alpha').next().text()).to.equal('3 characters left');
      })
    });


    describe('Filling the content to > warning threshold', () => {

      it('should decrement the counter', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('123').trigger(e);
        expect($html.find('.qa-alpha').next().text()).to.equal('1 character left');
      })

      it('should remove the ok state class', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('123').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--ok')).to.be.false;
      });


      it('should add the warn state class', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('123').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--warn')).to.be.true;
      });
      

      it('should not add the default warn state class if custom class provided', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
          warnClass: 'foo'
        });

        $html.find('.qa-alpha').val('123').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--warn')).to.be.false;
      });


      it('should not add the custom warn state class, if provided', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
          warnClass: 'foo'
        });

        $html.find('.qa-alpha').val('123').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('foo')).to.be.true;
      });


      it('should use the custom warn threshold, if provided', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
          warnThreshold: 40
        });

        $html.find('.qa-alpha').val('12').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--warn')).to.be.true;
      });

    });


    describe('Filling the content to > stop threshold', () => {

      it('should decrement the counter', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('1234').trigger(e);
        expect($html.find('.qa-alpha').next().text()).to.equal('0 characters left');
      })

      it('should not have the ok state class', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('1234').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--ok')).to.be.false;
      });


      it('should not have the warn state class', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('1234').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--warn')).to.be.false;
      });


      it('should add the stop state class', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
        });

        $html.find('.qa-alpha').val('1234').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--stop')).to.be.true;
      });
      

      it('should not add the default warn stop class if custom class provided', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
          stopClass: 'foo'
        });

        $html.find('.qa-alpha').val('1234').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('inputLength--stop')).to.be.false;
      });


      it('should not add the custom stop state class, if provided', () => {
        let e = $.Event('input');

        inputLength.init({
          targetSelector: '.qa-alpha',
          stopClass: 'foo'
        });

        $html.find('.qa-alpha').val('1234').trigger(e);
        expect($html.find('.qa-alpha').next().hasClass('foo')).to.be.true;
      });

    });
});
