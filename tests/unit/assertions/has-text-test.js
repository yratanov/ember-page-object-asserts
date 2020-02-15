import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { attribute, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { hasText } from 'ember-page-object-asserts/assertions';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  link: {
    scope: 'a',
    href: attribute('href'),
  }
});

module('hasText', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com" class="test">Test</a>
    `);
  });

  test('invalid assertion', async function(assert) {
    assert.deepEqual(hasText(page.link, 'wrong'), {
      actual: 'Test',
      expected: 'wrong',
      message: 'has text "wrong"',
      result: false
    });
  });

  test('valid assertion', async function(assert) {
    assert.deepEqual(hasText(page.link, 'Test'), {
      actual: 'Test',
      expected: 'Test',
      message: 'has text "Test"',
      result: true
    });
  });

  test('valid regexp', async function(assert) {
    assert.deepEqual(hasText(page.link, /Te/), {
      actual: 'Test',
      expected: /Te/,
      message: 'has text matching "/Te/"',
      result: true
    });
  });

  test('invalid regexp', async function(assert) {
    assert.deepEqual(hasText(page.link, /T2e/), {
      actual: 'Test',
      expected: /T2e/,
      message: 'has text matching "/T2e/"',
      result: false
    });
  });

  test('message passed', async function(assert) {
    assert.deepEqual(hasText(page.link, /T2e/, 'I expect!'), {
      actual: 'Test',
      expected: /T2e/,
      message: 'I expect!',
      result: false
    });
  });
});
