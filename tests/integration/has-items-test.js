import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { collection, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  names: collection('li'),
  surnames: collection('span')
});

module('hasItems', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <ul>
        <li>John</li>
        <li>Jane</li>
      </ul>
      <span>one</span><span>two</span><span>three</span>
    `);
  });

  test('collection length', async function(assert) {
    assert.po(page.names).hasItems(2);
    assert.po(page.surnames).hasItems(3);
  });
});
