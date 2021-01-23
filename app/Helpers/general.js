
const toCamelCase = (string) => {
  return string
    .replace(/_/g, " ")
    .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
    .replace(/\s/g, '')
    .replace(/^(.)/, function ($1) { return $1.toLowerCase(); })
    .replace(/ /g, "")
}
module.exports = {
  keyCamelCase(object) {
    let result = {}
    if (object !== null && Object.keys(object).length > 0) {
      let keyOfObject = Object.keys(object)
      keyOfObject.map((item) => {
        Object.assign(result, {
          [toCamelCase(item)]: object[item]
        })
      })
    }
    return result
  }
}