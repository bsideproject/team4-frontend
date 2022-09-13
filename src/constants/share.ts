const SHARE = {
  PRIVATE: "PRIVATE",
  FAMILY: "FAMILY"
} as const
type SHARE = typeof SHARE[keyof typeof SHARE]

export default SHARE