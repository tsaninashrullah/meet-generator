'use strict'
const Antl = use('Antl')

class TokenKeyValidation {
  get rules() {
    return {
      tokenKey: 'required',
    }
  }

  get messages() {
    return {
      'tokenKey.required': Antl.formatMessage('validation.required', {
        parameter: 'Token Key'
      })
    }
  }
}

module.exports = TokenKeyValidation
