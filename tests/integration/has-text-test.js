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

module('hasText', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`<div class="result">  the   big   text  </div>`);
  });

  test('with string', async function(assert) {
    assert.po(page.result).hasText('the big text');
  });

  test('with regexp', async function(assert) {
    assert.po(page.result).hasText(/big ?te\wt/);
  });
});
