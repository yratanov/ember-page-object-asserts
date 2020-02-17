import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { attribute, create, hasClass } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { isNot } from 'ember-page-object-asserts/assertions';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  link: {
    scope: 'a',
    href: attribute('href'),
    isDisabled: hasClass('test')
  }
});

module('isNot', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com" class="test">Test</a>
    `);
  });

  test('invalid assertion', async function(assert) {
    assert.deepEqual(isNot(page.link, 'href', 'http://google.com'), {
      actual: 'http://google.com',
      expected: 'not http://google.com',
      message: 'href is not http://google.com',
      result: false
    });
  });

  test('valid assertion', async function(assert) {
    assert.deepEqual(isNot(page.link, 'href', 'http://22.com'), {
      actual: 'http://google.com',
      expected: 'not http://22.com',
      message: 'href is not http://22.com',
      result: true
    });
  });

  test('when true', async function(assert) {
    assert.deepEqual(isNot(page.link, 'isDisabled', false), {
      actual: true,
      expected: 'not false',
      message: 'isDisabled is not false',
      result: true
    });
  });

  test('when false', async function(assert) {
    assert.deepEqual(isNot(page.link, 'isDisabled', true), {
      actual: true,
      expected: 'not true',
      message: 'isDisabled is not true',
      result: false
    });
  });

  test('message passed', async function(assert) {
    assert.deepEqual(isNot(page.link, 'isDisabled', true, 'I expect!'), {
      actual: true,
      expected: 'not true',
      message: 'I expect!',
      result: false
    });
  });
});
