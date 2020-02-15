// https://github.com/simplabs/qunit-dom/blob/master/lib/helpers/collapse-whitespace.ts
export function collapseWhitespaces(string: string): string {
  return string
    .replace(/[\t\r\n]/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/^ /, '')
    .replace(/ $/, '');
}
