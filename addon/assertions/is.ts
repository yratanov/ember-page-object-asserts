import { Component } from 'ember-cli-page-object/-private';
import { dasherize } from '@ember/string';

export function is(po: Component, field: string, value?: any, message?: string): AssertionResult {
  let actual = (po as any)[field];
  let expected = typeof value === 'undefined' ? true : value;

  if (!message) {
    message = '';
    if (expected === true) {
      message = `${dasherize(field).replace(/-/g, ' ')}`;
    } else if (expected === false) {
      message = `not ${dasherize(field).replace(/-/g, ' ')}`;
    } else {
      message = `${field} is "${expected}"`;
    }
  }

  return {
    result: actual === expected,
    actual,
    expected,
    message
  };
}
