declare module 'ceibo';

declare interface AssertionResult {
  result: boolean;
  actual: any;
  expected: any;
  message: string;
}
