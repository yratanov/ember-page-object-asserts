import QUnit from 'qunit';
import { PageObjectAssert, PageObjectAssertProxy } from './page-object-assert';
import { Component } from 'ember-cli-page-object/-private';

declare global {
  interface Assert {
    po(node: Component): PageObjectAssert;
  }
}

export function addPoAssert() {
  QUnit.extend(QUnit.assert, {
    po(node: Component) {
      return new PageObjectAssertProxy(node, this);
    }
  });
}
