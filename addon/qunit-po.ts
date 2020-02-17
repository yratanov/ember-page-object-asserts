import QUnit from 'qunit';
import { PageObjectAssert } from './page-object-assert';
import { Component } from 'ember-cli-page-object/-private';

declare global {
  interface Assert {
    po(node: Component): PageObjectAssert;
  }
}

export function addPoAssert() {
  QUnit.extend(QUnit.assert, {
    po(node: Component) {
      if (!node || typeof node === 'undefined') {
        throw 'pass page object to assert.po';
      }
      return new PageObjectAssert(node, this);
    }
  });
}
