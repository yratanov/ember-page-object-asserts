import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { collection, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  names: collection('li'),
  surnames: collection('span')
});

module('collection', function(hooks) {
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

  test('length', async function(assert) {
    assert.po(page.names).length.is(2);
    assert.po(page.surnames).length.is(3);
  });
});
