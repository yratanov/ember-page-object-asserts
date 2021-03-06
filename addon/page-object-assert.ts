import { Component } from 'ember-cli-page-object/-private';
import { pageObjectPath } from './helpers/page-object-path';
import { doesNotInclude, includes, is, isNot } from "ember-page-object-asserts/assertions";
import { findOne } from 'ember-cli-page-object/extend';
import EmberError from '@ember/error';

interface Assertions {
  (value?: any, message?: string): void
  is(...args: any[]): void
  isNot(...args: any[]): void
  includes(...args: any[]): void
  doesNotInclude(...args: any[]): void
}

const proxyHandler = {
  get: function(pageObjectAssert: PageObjectAssert, name: string): any {
    if (!(name in pageObjectAssert)) {
      if(!pageObjectAssert.po.isPresent) {
        findOne(pageObjectAssert.po);
      } else {
        throw new EmberError(`"${name}" not found in "${pageObjectPath(pageObjectAssert.po)}"`);
      }
    }

    // @ts-ignore
    return pageObjectAssert[name];
  }
}

export function createProxy(node: Component, qunitAssert: Assert) {
  if (!node || typeof node === 'undefined') {
    throw 'pass page object to assert.po';
  }
  return new Proxy(new PageObjectAssert(node, qunitAssert), proxyHandler);
}

export class PageObjectAssert {
  readonly assert: Assert;
  readonly po: Component;

  constructor(node: Component, assert: Assert) {
    this.po = node;
    this.assert = assert;
    if (!node.isPresent) {
      this.buildAssertionFor('isPresent');
      this.buildAssertionFor('isHidden');
    } else {
      this.buildAssertionsForProps();
    }

    if (typeof node.length !== 'undefined') {
      this.buildAssertionFor('length');
    }
  }

  private buildAssertionsForProps() {
    for (let prop in this.po) {
      this.buildAssertionFor(prop);
    }
  }

  private buildAssertionFor(prop: string): void {
    let assert = this.assert;
    let po = this.po;

    let assertFunc = function(func: Function) {
      return function(value: any, message?: string) {
        pushResult(po, assert, func(po, prop, value, message));
      };
    };

    const assertions = assertFunc(is) as Assertions;
    assertions.includes = assertFunc(includes);
    assertions.doesNotInclude = assertFunc(doesNotInclude);
    assertions.is = assertFunc(is);
    assertions.isNot = assertFunc(isNot);

    // @ts-ignore
    this[prop] = assertions;
  }
}

function pushResult(po: Component, assert: Assert, result: AssertionResult): void {
  result.message = `${pageObjectPath(po)}: ${result.message}`;
  assert.pushResult(result);
}
