'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const jwt = require('jsonwebtoken')
const Env = use('Env')

class GeneralApiAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    const tokenBearer = request.header('Authorization')
    if (tokenBearer !== 'undefined' && tokenBearer !== '') {
      try {
        await auth.authenticator('jwt').check()
        await next()
      } catch (error) {
        if (error.name === 'ValidationException') {
          response.defaultResponseJson(400, error.messages[0].message)
        } else if (error.name === 'InvalidJwtToken') {
          response.defaultResponseJson(401, 'Invalid Token!')
        } else if (error.name === 'ExpiredJwtToken') {
          response.defaultResponseJson(499, 'Token expired', {}, 499)
        } else {
          response.defaultResponseJson(500, 'Something went wrong')
        }
      }
    } else {
      response.defaultResponseJson(403, 'Please provide token!')
    }
  }
}

module.exports = GeneralApiAuth
