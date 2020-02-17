import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { attribute, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { includes } from 'ember-page-object-asserts/assertions';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  link: {
    scope: 'a',
    href: attribute('href')
  }
});

module('includes', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com" class="test">Test</a>
    `);
  });

  test('invalid assertion', async function(assert) {
    assert.deepEqual(includes(page.link, 'href', 'apple.com'), {
      actual: 'http://google.com',
      expected: 'apple.com',
      message: 'href includes "apple.com"',
      result: false
    });
  });

  test('valid assertion', async function(assert) {
    assert.deepEqual(includes(page.link, 'href', 'google'), {
      actual: 'http://google.com',
      expected: 'google',
      message: 'href includes "google"',
      result: true
    });
  });

  test('message passed', async function(assert) {
    assert.deepEqual(includes(page.link, 'href', 'http://google.com', 'I expect!'), {
      actual: 'http://google.com',
      expected: 'http://google.com',
      message: 'I expect!',
      result: true
    });
  });
});
