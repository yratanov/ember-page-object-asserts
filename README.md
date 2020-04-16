ember-page-object-asserts
==============================================================================

[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![codecov](https://codecov.io/gh/yratanov/ember-page-object-asserts/branch/master/graph/badge.svg)](https://codecov.io/gh/yratanov/ember-page-object-asserts)
[![Maintainability](https://api.codeclimate.com/v1/badges/2b8436017d28227f08ce/maintainability)](https://codeclimate.com/github/yratanov/ember-page-object-asserts/maintainability)
[![Dependabot enabled](https://img.shields.io/badge/dependabot-enabled-blue.svg?logo=dependabot)](https://dependabot.com/)

[travis-badge]: https://travis-ci.com/yratanov/ember-page-object-asserts.svg?branch=master
[travis-badge-url]: https://travis-ci.org/yratanov/ember-page-object-asserts

Adds QUnit asserts for [ember-cli-page-object](https://github.com/san650/ember-cli-page-object) to make test errors more user-friendly and make code shorter.


Why?
------------------------------------------------------------------------------

User-friendly messages and simpler syntax:

```js
const page = create({
  link: {
    scope: 'a',
    href: attribute('href'),
    isHighlighted: hasClass('highlighted'),
  },
});

assert.po(page.element).text.is("test"); //message 'page.element: text is "text"'
assert.po(page.link).href.is('google.com'); //message 'page.link: href is "google.com"'
assert.po(page.link).href.includes('google.com'); //message 'page.link: href includes "google.com"'
assert.po(page.link).isHighlighted(); //message 'page.link: is highlighted'
assert.po(page.input).isPresent();  //message 'page.input: is present'
``` 


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-page-object-asserts
```


Usage
------------------------------------------------------------------------------

Import new assert in your `tests/test-helper.js` file:
```js
import { addPoAssert } from 'ember-page-object-asserts';

addPoAssert();

setApplication(Application.create(config.APP));
```


#### Built-in asserts

##### is/isNot

```js
assert.po(page.element).text.is("test");
assert.po(page.element).text.isNot("test");
assert.po(page.input).value.is('test');
```

##### includes/doesNotInclude

```js
assert.po(page.element).text.includes("test");
assert.po(page.element).text.doesNotInclude("test");
```

##### isPresent/isHidden

```js
assert.po(page.input).isPresent();
assert.po(page.input).isHidden();
```

##### Collections

```js
const page = create({
  list: collection('li')
});

assert.po(page.list).length.is(3);
```

##### Properties as asserts

```js
const page = create({
  link: {
    isHighlighted: hasClass('highlighted'),
  },
});

assert.po(page.list).isHighlighted();
assert.po(page.list).isHighlighted(false);
```



Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
