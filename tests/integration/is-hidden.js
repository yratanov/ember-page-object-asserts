import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  wrongElement: {
    scope: 'wrong-element',
  }
});

module('isPresent', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <div class="element"></div>
    `);
  });

  test('checks element is not on page', async function(assert) {
    assert.po(page.wrongElement).isHidden();
  });
});
