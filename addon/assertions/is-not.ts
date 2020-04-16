import { Component } from 'ember-cli-page-object/-private';
import { isMessage } from "ember-page-object-asserts/assertions/utils/is-message";

export function isNot(po: Component, field: string, value?: any, message?: string): AssertionResult {
  let actual = (po as any)[field];

  return {
    result: actual !== value,
    actual,
    expected: `not ${value}`,
    message: message || isMessage(field, value, false)
  };
}
