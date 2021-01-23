const Antl = use('Antl')

module.exports = {
  getMessageError: (type, parameter, additionalObject = {}) => {
    return Antl.formatMessage(`validation.${type}`, Object.assign(additionalObject, {
      parameter
    }))
  }
}