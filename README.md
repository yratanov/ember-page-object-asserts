ember-page-object-asserts
==============================================================================

[![TravisCI Build Status][travis-badge]][travis-badge-url]

[travis-badge]: https://travis-ci.com/yratanov/ember-page-object-asserts.svg?branch=master
[travis-badge-url]: https://travis-ci.org/yratanov/ember-page-object-asserts

Adds QUnit asserts for [ember-cli-page-object](https://github.com/san650/ember-cli-page-object) to make test errors more user-friendly and make code shorter.


Why?
------------------------------------------------------------------------------

For example you have this test:


```js
const page = create({
  link: {
    scope: 'a',
    href: attribute('href'),
    hasText: hasText(),
  },
});

assert.equal(page.link.text, 'Some text');
assert.equal(page.link.hasText('something'));
assert.ok(page.link.isPresent);
```


If you don't provide message for every assert you will get very unhelpful messages, like `expecte: true, got: false` and nothing more.
But tests with page object are very descriptive by it's nature, we can utilize that to show better messages, without providing anything more.
Example:

```js
assert.po(page.element).hasText("test"); //message 'page.element: has text "text"'
assert.po(page.link).has('href', 'google.com'); //message 'page.link: has href "google.com"'
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

##### hasText/hasNoText

```js
assert.po(page.element).hasText("test");
assert.po(page.element).hasText(/test/);

assert.po(page.element).hasNoText("test");
assert.po(page.element).hasNoText(/test/);
```

##### has

```js
const page = create({
  link: {
    scope: 'a',
    href: attribute('href'),
    isHighlighted: hasClass('highlighted'),
  },
});

assert.po(page.link).has('href', 'google.com');
assert.po(page.link).has('isHighlighted');
```


##### isPresent/isHidden

```js
assert.po(page.input).isPresent();
assert.po(page.input).isHidden();
```

##### hasValue

```js
assert.po(page.input).hasValue('test');
```

##### hasItems

```js
const page = create({
  list: collection('li')
});

assert.po(page.list).hasItems(3);
```



Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
