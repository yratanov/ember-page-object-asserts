import { Component } from 'ember-cli-page-object/-private';
import { isMessage } from './utils/is-message';

export function is(po: Component, field: string, value?: any, message?: string): AssertionResult {
  let actual = (po as any)[field];
  let expected = typeof value === 'undefined' ? true : value;

  return {
    result: actual === expected,
    actual,
    expected,
    message: message || isMessage(field, expected, true)
  };
}
