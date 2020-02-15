import { Component } from 'ember-cli-page-object/-private';

export function has(po: Component, field: string, value?: any, message?: string) : AssertionResult {
  let result = po[field] === value;
  return {
    result,
    actual: po[field],
    expected: value,
    message: message || `${value === true ? '' : 'has '}${field}${value === true ? '' : ` "${value}"`}`
  };
}
