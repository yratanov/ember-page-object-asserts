import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { attribute, create, hasClass } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  name: {
    scope: '[name="name"]',
    isHighlighted: hasClass('highlighted')
  },
  link: {
    scope: 'a',
    href: attribute('href')
  }
});

module('has', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com">Test</a>
      <input name="password" class="highlighted"/>
    `);
  });

  test('supports checking properties with default value', async function(assert) {
    assert.po(page.password).has('isHighlighted');
  });

  test('supports checking properties with values', async function(assert) {
    assert.po(page.link).has('href', 'http://google.com');
  });
});
