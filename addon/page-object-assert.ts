import { Component } from 'ember-cli-page-object/-private';
import { doesNotInclude, hasItems, includes, is, isNot } from './assertions';
import { pageObjectPath } from './helpers/page-object-path';

interface Assertions {
  (value?: any, message?: string): void
  is(...args: any[]): void
  isNot(...args: any[]): void
  includes(...args: any[]): void
  doesNotInclude(...args: any[]): void
}

export class PageObjectAssert {
  readonly assert: Assert;
  readonly po: Component;

  constructor(node: Component, assert: Assert) {
    this.po = node;
    this.assert = assert;

    for (let prop in node) {
      if (node.hasOwnProperty(prop) && typeof node[prop] !== 'function') {
        this.buildAssertions(prop);
      }
    }
  }

  hasItems(size: number, message?: string) {
    this.pushResult(
      hasItems(this.po, size, message)
    );
  }

  private buildAssertions(prop: string): void {
    let assert = this.assert;
    let po = this.po;

    const assertions = function (value?: any, message?: string) {
      pushResult(po, assert, is(po, prop, value, message));
    } as Assertions;

    assertions.includes = function (value: any, message?: string) {
      pushResult(po, assert, includes(po, prop, value, message));
    };
    assertions.doesNotInclude = function (value: any, message?: string) {
      pushResult(po, assert, doesNotInclude(po, prop, value, message));
    };
    assertions.is = function (value: string | number | boolean | undefined | null, message?: string) {
      pushResult(po, assert, is(po, prop, value, message));
    };
    assertions.isNot = function (value: string | number | boolean | undefined | null, message?: string) {
      pushResult(po, assert, isNot(po, prop, value, message));
    };

    // @ts-ignore
    this[prop] = assertions;
  }

  private pushResult(result: AssertionResult): void {
    pushResult(this.po, this.assert, result);
  }
}

function pushResult(po: Component, assert: Assert, result: AssertionResult): void {
  result.message = `${pageObjectPath(po)}: ${result.message}`;
  assert.pushResult(result);
}
