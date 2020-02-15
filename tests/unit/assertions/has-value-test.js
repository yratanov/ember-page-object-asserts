import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { attribute, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { hasValue } from 'ember-page-object-asserts/assertions';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  link: {
    scope: 'input',
    href: attribute('href'),
  }
});

module('hasValue', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <input type="text" value="the value" />
    `);
  });

  test('invalid assertion', async function(assert) {
    assert.deepEqual(hasValue(page.link, 'wrong'), {
      actual: 'the value',
      expected: 'wrong',
      message: 'has value "wrong"',
      result: false
    });
  });

  test('valid assertion', async function(assert) {
    assert.deepEqual(hasValue(page.link, 'the value'), {
      actual: 'the value',
      expected: 'the value',
      message: 'has value "the value"',
      result: true
    });
  });

  test('message passed', async function(assert) {
    assert.deepEqual(hasValue(page.link, 'the value', 'custom message'), {
      actual: 'the value',
      expected: 'the value',
      message: 'custom message',
      result: true
    });
  });
});
