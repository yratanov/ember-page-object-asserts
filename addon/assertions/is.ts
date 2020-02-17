import { Component } from 'ember-cli-page-object/-private';

export function is(po: Component, field: string, value?: any, message?: string) : AssertionResult {
  let actual = (po as any)[field];
  let expected = typeof value === 'undefined' ? true : value;

  return {
    result: actual === expected,
    actual,
    expected,
    message: message || `${field}${expected === true ? '' : ` is "${expected}"`}`
  };
}
