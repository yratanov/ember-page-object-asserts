import QUnit from 'qunit';
import { createProxy, PageObjectAssert } from './page-object-assert';
import { Component } from 'ember-cli-page-object/-private';

declare global {
  interface Assert {
    po(node: Component): PageObjectAssert;
  }
}

export function addPoAssert() {
  QUnit.extend(QUnit.assert, {
    po(node: Component) {
      return createProxy(node, this);
    }
  });
}
