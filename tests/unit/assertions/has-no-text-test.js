import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { attribute, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { hasNoText } from 'ember-page-object-asserts/assertions';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  link: {
    scope: 'a',
    href: attribute('href'),
  }
});

module('hasNoText', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com" class="test">Test</a>
    `);
  });

  test('invalid assertion', async function(assert) {
    assert.deepEqual(hasNoText(page.link, 'wrong'), {
      actual: 'Test',
      expected: 'wrong',
      message: 'has no text "wrong"',
      result: true
    });
  });

  test('valid assertion', async function(assert) {
    assert.deepEqual(hasNoText(page.link, 'Test'), {
      actual: 'Test',
      expected: 'Test',
      message: 'has no text "Test"',
      result: false
    });
  });

  test('valid regexp', async function(assert) {
    assert.deepEqual(hasNoText(page.link, /Te/), {
      actual: 'Test',
      expected: /Te/,
      message: 'has no text matching "/Te/"',
      result: false
    });
  });

  test('invalid regexp', async function(assert) {
    assert.deepEqual(hasNoText(page.link, /T2e/), {
      actual: 'Test',
      expected: /T2e/,
      message: 'has no text matching "/T2e/"',
      result: true
    });
  });

  test('message passed', async function(assert) {
    assert.deepEqual(hasNoText(page.link, /T2e/, 'I expect!'), {
      actual: 'Test',
      expected: /T2e/,
      message: 'I expect!',
      result: true
    });
  });
});
