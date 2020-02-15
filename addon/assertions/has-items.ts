import { Component } from 'ember-cli-page-object/-private';

export function hasItems(po: Component, size: any, message?: string) : AssertionResult {
  let actual = po.length;
  let result = actual === size;
  return { result, actual, expected: size, message: message || `has ${size} item${size === 1 ? '' : 's'}` };
}
