import { Component } from 'ember-cli-page-object/-private';

export function hasValue(po: Component, expected: string, message?: string) : AssertionResult {
  let value = po.value;
  return {
    result: value === expected,
    actual: value,
    expected,
    message: message || `has value "${expected}"`
  };
}
