import { dasherize } from "@ember/string";

export function isMessage(field: string, value: any, defaultBool:boolean) {
  if (value === defaultBool) {
    return `${dasherize(field).replace(/-/g, ' ')}`;
  } else if (value === !defaultBool) {
    return `not ${dasherize(field).replace(/-/g, ' ')}`;
  } else {
    return `${field} is ${defaultBool ? '' : 'not '}"${value}"`;
  }
}
