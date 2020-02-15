import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';

const page = create({
  name: {
    scope: '[name=name]'
  }
});

module('hasValue', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`<input name="name" value="test"/>`);
  });

  test('supports hasValue', async function(assert) {
    assert.po(page.name).hasValue('test');
  });
});
