import { Component } from 'ember-cli-page-object/-private';
import { dasherize } from "@ember/string";

export function isNot(po: Component, field: string, value?: any, message?: string) : AssertionResult {
  let actual = (po as any)[field];

  if (!message) {
    message = '';
    if (value === false) {
      message = `${dasherize(field).replace(/-/g, ' ')}`;
    } else if (value === true) {
      message = `not ${dasherize(field).replace(/-/g, ' ')}`;
    } else {
      message = `${field} is not "${value}"`;
    }
  }

  return {
    result: actual !== value,
    actual,
    expected: `not ${value}`,
    message: message || `${field} is not "${value}"`
  };
}
