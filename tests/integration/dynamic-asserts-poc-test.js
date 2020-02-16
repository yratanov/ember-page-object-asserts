import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { attribute, create, hasClass } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  password: {
    scope: '[name="password"]',
    isHighlighted: hasClass('highlighted'),
  },
  link: {
    scope: 'a',
    href: attribute('href'),
    isActive: hasClass('active')
  }
});

module('dynamic asserts poc', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com"> Test </a>

      <input name="password" class="highlighted">
    `);
  });

  test('1', function(assert) {
    assert.po(page.link).text.includes('est');
  });

  test('2', function(assert) {
    assert.po(page.link).isActive(false);
  });

  test('3', function(assert) {
    assert.po(page.link).text.is('Test');
  });

  test('4', function(assert) {
    assert.po(page.link).href.is('http://google.com');
  });
});
