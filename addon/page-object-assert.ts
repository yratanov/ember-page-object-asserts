import { Component } from 'ember-cli-page-object/-private';
import { has, hasItems, hasNoText, hasText, hasValue } from './assertions';
import { pageObjectPath } from './helpers/page-object-path';

export class PageObjectAssert {
  private assert: Assert;
  private readonly po: Component;

  constructor(node: Component, assert: Assert) {
    this.po = node;
    this.assert = assert;

    for (let prop in node) {
      if (node.hasOwnProperty(prop) && typeof node[prop] !== 'function') {
        // @ts-ignore
        this[prop] = (value?: any, message?: string) => {
          return this.has(prop, value, message);
        }
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
    result.message = `${pageObjectPath(this.po)}: ${result.message}`;
    this.assert.pushResult(result);
  }
}
