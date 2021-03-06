# `<relative-time>` webcomponent

A [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) used when you want to render the relative time to a date.
It is setup with the intention to be used like you would the `<time>` element.


## Installation

`npm install relative-time-webcomponent`

Or

`bower install relative-time-webcomponent`

## Requirements

Since web components are relatively new and not widely supported by most browsers,
the following requirements will need to be included in your project in order for
this to work properly across the majority of browsers that need to be supported today.

```
npm install document-register-element
npm install es6-symbol
```

And, for browsers that don’t natively support web components, you have to make sure
that you convert all the native `HTMLElement` properties to `function`s so that
the `document-register-element` polyfill does not bork when creating this–and possibly
your–custom elements.

```
if (typeof HTMLElement !== 'function') {
    Object.getOwnPropertyNames(window).forEach((name) => {
        if (name.indexOf('HTML') === 0) {
            let tagName = name.replace('HTML', '').replace('Element', '').toLowerCase();

            tagName = tagName.length && tagName !== 'unknown'
                ? tagName
                : 'div';

            window[name] = () => {};
            window[name].prototype = document.createElement(tagName);
        }
    });
}
```

## Usage

```
    <relative-time datetime="2016-04-24T19:38:00"></relative-time>
    <relative-time datetime="2016-04-24T19:38:00" autoupdate></relative-time>
```

## License

The MIT License (MIT)

Copyright (c) 2016 Ryan Hefner [https://www.ryanhefner.com](https://www.ryanhefner.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
