import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  element: {
    scope: 'element',
  }
});

module('isPresent', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <div class="element"></div>
    `);
  });

  test('checks element is on page', async function(assert) {
    assert.po(page.element).isPresent();
  });
});
