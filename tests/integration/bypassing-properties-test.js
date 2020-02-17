import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { attribute, clickable, create, hasClass } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  password: {
    scope: '[name="password"]',
    isHighlighted: hasClass('highlighted'),
    clack: clickable(),

    customField: {
      isDescriptor: true,

      get() {
        return 'value';
      }
    }
  },
  link: {
    scope: 'a',
    href: attribute('href')
  }
});

module('bypassing properties', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <a href="http://google.com">Test</a>
      <input name="password" class="highlighted"/>
    `);
  });

  test('calling property as function', async function(assert) {
    assert.po(page.password).isHighlighted();
  });

  test('is', async function(assert) {
    assert.po(page.link).href.is('http://google.com');
  });

  test('includes', async function(assert) {
    assert.po(page.link).href.includes('google');
  });

  test('doesNotInclude', async function(assert) {
    assert.po(page.link).href.doesNotInclude('apple');
  });

  test('isNot', async function(assert) {
    assert.po(page.link).href.isNot('http://goosagle.com');
  });

  test('checks custom property', async function(assert) {
    assert.po(page.password).customField.is('value');
  });

  test('raises error if property is a custom function', async function(assert) {
    try {
      assert.po(page.password).clack();
    } catch (e) {
      assert.equal(e.message, 'assert.po(...).clack is not a function')
    }
  });

  test('raises error if property is a default function', async function(assert) {
    try {
      assert.po(page.password).click();
    } catch (e) {
      assert.equal(e.message, 'assert.po(...).click is not a function')
    }
  });
});
