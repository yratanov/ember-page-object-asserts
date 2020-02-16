import { Component } from 'ember-cli-page-object/-private';
import { has, hasItems, hasNoText, hasText, hasValue } from './assertions';
import { pageObjectPath } from './helpers/page-object-path';

interface Assertions {
  (value?: any, message?: string): void
  is(...args: any[]): void
  includes(...args: any[]): void
}

export class PageObjectAssert {
  private assert: Assert;
  private readonly po: Component;

  constructor(node: Component, assert: Assert) {
    this.po = node;
    this.assert = assert;

    for (let prop in node) {
      if (node.hasOwnProperty(prop) && typeof node[prop] !== 'function') {
        const assertions = function(value?: unknown, message?: string) {
          assertions.is(value, message);
        } as Assertions

        assertions.includes = (value: string, message?: string) => {
          pushResult(
            node,
            assert, {
            result: (node as any)[prop].includes(value),
            actual: node[prop],
            expected: value,
            message: message || `${prop} includes "${value}"`
          }
          );
        }

        assertions.is = (value: string|number|boolean|undefined|null, message?: string) => {
          pushResult(
            node,
            assert,
            has(node, prop, typeof value === 'undefined' ? true : value, message)
          );
        }


        // @ts-ignore
        this[prop] = assertions
      }
    }
  }

  hasText(expected: string | RegExp, message?: string) {
    this.pushResult(hasText(this.po, expected, message));
  }

  hasValue(expected: string, message?: string) {
    this.pushResult(hasValue(this.po, expected, message));
  }

  hasNoText(expected: string | RegExp, message?: string) {
    this.pushResult(hasNoText(this.po, expected, message));
  }

  has(field: string, value?: any, message?: string) {
    this.pushResult(
      has(this.po, field, typeof value === 'undefined' ? true : value, message)
    );
  }

  isPresent(message?: string) {
    this.pushResult({
      actual: this.po.isPresent,
      expected: true,
      result: this.po.isPresent === true,
      message: message || `is present`
    });
  }

  isHidden(message?: string) {
    this.pushResult({
      actual: this.po.isHidden,
      expected: true,
      result: this.po.isHidden === true,
      message: message || `is hidden`
    });
  }

  hasItems(size: number, message?: string) {
    this.pushResult(
      hasItems(this.po, size, message)
    );
  }

  private pushResult(result: AssertionResult): void {
    pushResult(this.po, this.assert, result);
  }
}

function pushResult(po: Component, assert: Assert, result: AssertionResult): void {
  result.message = `${pageObjectPath(po)}: ${result.message}`;
  assert.pushResult(result);
}
