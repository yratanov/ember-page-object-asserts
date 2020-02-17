import { Component } from 'ember-cli-page-object/-private';

export function isNot(po: Component, field: string, value?: any, message?: string) : AssertionResult {
  let actual = (po as any)[field];
  return {
    result: actual !== value,
    actual,
    expected: `not ${value}`,
    message: message || `${field} is not "${value}"`
  };
}
