import { Component } from "ember-cli-page-object/-private";
import Ceibo from "ceibo";

export function pageObjectPath(node: Component) {
  let path = [];
  let current = node;

  do {
    path.unshift(current.key || Ceibo.meta(current).key);
    current = current.key ? current.parent : Ceibo.parent(current)
  } while (Ceibo.parent(current));

  return `page.${path.join('.')}`;
}
