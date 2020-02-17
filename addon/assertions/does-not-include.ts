import { Component } from 'ember-cli-page-object/-private';

export function doesNotInclude(po: Component, field: string, value?: any, message?: string) : AssertionResult {
  let actual = (po as any)[field];
  return {
    result: !actual.includes(value),
    actual,
    expected: value,
    message: message || `${field} does not include "${value}"`
  };
}
