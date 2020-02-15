import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { collection, create } from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import { pageObjectPath } from 'ember-page-object-asserts/helpers';
import { setupRenderingTest } from 'ember-qunit';

const page = create({
  container: {
    scope: '.container',
    list: collection('li', {
      name: { scope: '.name' }
    })
  }
});

module('pageObjectPath', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <div class="container">
       <ul>
         <li>
           <div class="name">1</div>
         </li>
         <li>
           <div class="name">2</div>
         </li>
         <li>
           <div class="name">3</div>
         </li>
       </ul>
      </div>
    `);
  });

  test('single item', async function(assert) {
    assert.equal(pageObjectPath(page.container), 'page.container');
  });

  test('collection', async function(assert) {
    assert.equal(pageObjectPath(page.container.list), 'page.container.list');
  });

  test('item in collection', async function(assert) {
    assert.equal(pageObjectPath(page.container.list[0].name), 'page.container.list[0].name');
  });
});
