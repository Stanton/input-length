# Input Length Warning

This component creates a visual representation of the `maxlength` constraint
and updates it as the user interacts with that field, with customisation 
to allow custom classes and styling.

![text](https://user-images.githubusercontent.com/18653/119674968-8b534880-be34-11eb-9245-b2ac338823e1.gif)

## Accessibility

This component bakes in the following features automatically:

* The message is linked to the input using `aria-describedby` so it is announced 
when the field receives focus.
* The message uses a live region to communicate the number of remaining characters
when the user pauses or finishes typing.

## Basic usage

```html
<label for="example">Example field</label>
<input type="text" id="example" class="js-inputLengthWarning" maxlength="4" />
```

```js
const $ = require('jquery');
const InputLength = require('./dist/InputLength');

$(function () {
    const inputLength = new InputLength($('html'));

    inputLength.init({
      targetSelector: '.js-inputLengthWarning'
    });
});
```

A new element will be inserted immediately after the target input, and new 
attributes will be added. The `aria-describedby` guid will be added to
the existing aria-describedy value if one is already present. 

```html
<label for="example">Example field</label>
<input type="text" id="example" class="js-inputLengthWarning" maxlength="4" aria-describedby="guid-xxxx" />
<span id="guid-xxxx" class="inputLength inputLength--ok">
  <span class="inputLength__label">4</span> characters allowed
</span>
```

## Additional options

There are a handful of classes and options that can be customised to suit your
implementation.

| Option        | Type.   | Default              | Description |
| ------------- | ------- | -------------------- | ----------- |
| baseClass     | string  | `inputLength`        | Class applied to the main message container, appended immediately after the target input |
| labelClass    | string  | `inputLength__label` | Class applied to the `span` element which wraps the integer count |
| okClass       | string  | `inputLength--ok`    | Class applied when the input length is < `warnThreshold` |
| warnClass     | string  | `inputLength--warn`  | Class applied when the input length is > `warnThreshold` and < `maxlength` |
| stopClass     | string  | `inputLength--stop`  | Class applied when the input length equals `maxlength` |
| warnThreshold | int     | `70`                 | Percentage of `maxlength` where the `warnClass` should be applied |

Pass options through the constructor, for example:

```js
inputLength.init({
  targetSelector: '.js-inputLengthWarning',
  labelClass: 'label',
  okClass: 'label--success',
  okClass: 'label--warning',
  okClass: 'label--danger',
  warnThreshold: 90
});
```
