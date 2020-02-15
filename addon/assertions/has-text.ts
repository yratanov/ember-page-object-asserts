import { Component } from 'ember-cli-page-object/-private';
import { collapseWhitespaces } from "../helpers";

export function hasText(po: Component, expected: string | RegExp, message?: string) : AssertionResult {
  let text = po.text || '';
  let result, actual;
  if (expected instanceof RegExp) {
    result = expected.test(text);
    actual = text;

    if (!message) {
      message = `has text matching "${expected}"`;
    }
  } else {
    expected = collapseWhitespaces(expected);
    actual = collapseWhitespaces(text);
    result = actual === expected;

    if (!message) {
      message = `has text "${expected}"`;
    }
  }

  return { result, actual, expected, message };
}
