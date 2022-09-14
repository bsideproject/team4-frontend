interface ModuleType {
  [key: string]: string,
}
const makeModuleTypes = (types: Array<string>) => {
  return types.reduce((acc: ModuleType, type: string) => {
    acc[type] = type
    return acc
  }, {})
}

export { makeModuleTypes }
