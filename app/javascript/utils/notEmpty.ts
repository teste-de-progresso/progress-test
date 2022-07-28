// Use a type predicate function to avoid opting out of strict type checking: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
export const notEmpty = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined
