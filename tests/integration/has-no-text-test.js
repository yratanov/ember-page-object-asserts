import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  result: {
    scope: '.result'
  }
});

module('hasNoText', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`<div class="result">  the   big   text  </div>`);
  });

  test('supports hasNoText', async function(assert) {
    assert.po(page.result).hasNoText('some test');
  });
});
