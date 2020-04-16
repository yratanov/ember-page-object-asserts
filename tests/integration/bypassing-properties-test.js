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
  notExisting: {
    scope: '.not-existing',
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

  test('responds with proper message when trying to access field of not existing page object', async function(assert) {
    assert.raises(() => {
      assert.po(page.notExisting).text.is('test');
    }, /Error: Element not found/);

    assert.raises(() => {
      assert.po(page.notExisting).text.is('test');
    }, /PageObject: 'page.notExisting.'/);

    assert.raises(() => {
      assert.po(page.notExisting).text.is('test');
    }, /Selector: '.not-existing'/);
  });

  test('responds with proper message when trying to access not existing field of existing page object', async function(assert) {
    assert.raises(() => {
      assert.po(page.link).notExistingProp.is('test');
    }, /Error: "notExistingProp" not found in "page.link"/);
  });

  test('checks custom property', async function(assert) {
    assert.po(page.password).customField.is('value');
  });
});
