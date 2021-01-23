'use strict'
const Antl = use('Antl')
class AuthRequest {
  get validateAll() {
    const typeOfClient = this.ctx.request.header('client-id')
    if (typeof typeOfClient !== 'undefined' && (typeOfClient === 'mobile' || typeOfClient === 'desktop')) {
      return false
    } else {
      return true
    }
  }
  get rules() {
    const typeOfClient = this.ctx.request.header('client-id')
    if (typeOfClient === 'mobile') {
      return {
        credential: 'required'
      }
    } else {
      return {
        credential: 'required',
        password: 'required'
      }
    }
  }

  get messages() {
    return {
      'credential.required': Antl.formatMessage('validation.required', {
        parameter: 'Email / Username'
      }),
      'password.required': Antl.formatMessage('validation.required', {
        parameter: 'password'
      })
    }
  }
}

module.exports = AuthRequest
