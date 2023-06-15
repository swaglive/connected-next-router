export const PUSH = 'push'
export const REPLACE = 'replace'
export const PREFETCH = 'prefetch'
export const GO = 'go'
export const BACK = 'back'

export type RouterMethod =
  | typeof PUSH
  | typeof REPLACE
  | typeof PREFETCH
  | typeof GO
  | typeof BACK

export default {
  PUSH,
  REPLACE,
  GO,
  BACK,
  PREFETCH
}
