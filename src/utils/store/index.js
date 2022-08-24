const makeModuleTypes = (types = []) => {
  return types.reduce((acc, type) => {
    acc[type] = type
    return acc
  }, {})
}

export {
    makeModuleTypes
}