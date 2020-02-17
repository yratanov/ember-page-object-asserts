import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { attribute, create, hasClass } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { is } from 'ember-page-object-asserts/assertions';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  link: {
    scope: 'a',
    href: attribute('href'),
    isDisabled: hasClass('test')
  }
});

module('is', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com" class="test">Test</a>
    `);
  });

  test('invalid assertion', async function(assert) {
    assert.deepEqual(is(page.link, 'href', 'invalid'), {
      actual: 'http://google.com',
      expected: 'invalid',
      message: 'href is invalid',
      result: false
    });
  });

  test('valid assertion', async function(assert) {
    assert.deepEqual(is(page.link, 'href', 'http://google.com'), {
      actual: 'http://google.com',
      expected: 'http://google.com',
      message: 'href is http://google.com',
      result: true
    });
  });

  test('when true', async function(assert) {
    assert.deepEqual(is(page.link, 'isDisabled', true), {
      actual: true,
      expected: true,
      message: 'isDisabled is true',
      result: true
    });
  });

  test('when false', async function(assert) {
    assert.deepEqual(is(page.link, 'isDisabled', false), {
      actual: true,
      expected: false,
      message: 'isDisabled is false',
      result: false
    });
  });

  test('message passed', async function(assert) {
    assert.deepEqual(is(page.link, 'isDisabled', false, 'I expect!'), {
      actual: true,
      expected: false,
      message: 'I expect!',
      result: false
    });
  });
});
