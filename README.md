
    Super easy template engine. Write templates in JSON!

```js
var jt = require('jt');

var template = jt({
    tag: 'div',
    content: 'foo'
});

console.log(template()); // <div>foo</div>
```

Install
===============

    npm install jt

```jt``` return function(template) that can be callen in future


API
==============

You can create template from string, array, json and functions


```js
var template = jt('hello');

template(); // 'hello'
```

```js
var template = jt(['hello ', 'world']);

template(); // 'hello world'
```

```js
var template = jt({
    tag: 'snap',
    class: 'text'
    content: ['hello ', 'world']
});

template(); // '<span class="text">hello world</span>'
```

Use ```function``` as argument to create dynamic templates

```js
var template = jt(function (who) {
    return {
        tag: 'div',
        content: ['hello ', who]
    }

});

template('world'); // '<span class="text">hello world</span>'
```

```js
var template = jt(function (who, action) {
    return {
        tag: 'div',
        content: [action, ' ', who]
    }

});

template('world', 'hello'); // '<span class="text">hello world</span>'
```
