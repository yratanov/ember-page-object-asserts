import { Component } from 'ember-cli-page-object/-private';

export function is(po: Component, field: string, value?: any, message?: string) : AssertionResult {
  let actual = (po as any)[field];
  return {
    result: actual === (typeof value === 'undefined' ? true : value),
    actual,
    expected: value,
    message: message || `${field} is ${value}`
  };
}
