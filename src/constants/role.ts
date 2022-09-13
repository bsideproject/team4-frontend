const ROLE = {
  USER: "ROLE_USER",
  MANAGER: "ROLE_MANAGER"
} as const
type ROLE = typeof ROLE[keyof typeof ROLE]

export default ROLE