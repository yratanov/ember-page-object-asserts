import { module, test } from 'qunit';
import { create } from 'ember-cli-page-object';
import { PageObjectAssert } from 'ember-page-object-asserts';
import { setupRenderingTest } from 'ember-qunit';

const page = create({});

module('assert.po', function(hooks) {
  setupRenderingTest(hooks);

  test('no page object passed', async function(assert) {
    assert.throws(() => { assert.po(null) }, /pass page object to assert.po/, 'error raised');
  });

  test('assigns node and assert', async function(assert) {
    let assertPo = assert.po(page);
    assert.ok(assertPo instanceof PageObjectAssert);
    assert.equal(assertPo.po, page);
    assert.equal(assertPo.assert, assert);
  });
});
