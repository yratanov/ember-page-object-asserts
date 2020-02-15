import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { collection, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { hasItems } from 'ember-page-object-asserts/assertions';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  list: collection('li')
});

module('hasItems', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    `);
  });

  test('invalid assertion', async function(assert) {
    assert.deepEqual(hasItems(page.list, 1), {
      actual: 2,
      expected: 1,
      message: 'has 1 item',
      result: false
    });
  });

  test('valid assertion', async function(assert) {
    assert.deepEqual(hasItems(page.list, 2), {
      actual: 2,
      expected: 2,
      message: 'has 2 items',
      result: true
    });
  });

  test('message passed', async function(assert) {
    assert.deepEqual(hasItems(page.list,  2, 'custom message'), {
      actual: 2,
      expected: 2,
      message: 'custom message',
      result: true
    });
  });
});
