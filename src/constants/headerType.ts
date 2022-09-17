const HEADER_TYPE = {
  MAIN: "main",
  CHECK: "check",
  NONE: "none",
  MORE: "more",
  SHARE: "share",
  LOGIN: "login"
} as const
type HEADER_TYPE = typeof HEADER_TYPE[keyof typeof HEADER_TYPE]

export default HEADER_TYPE
