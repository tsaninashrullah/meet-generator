'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ session, request, response, view }, next) {
    if (typeof session.get('user') === 'undefined' || session.get('user') === null) {
      return response.redirect('/login')
    } else {
      const View = use('View')
      
      View.global('userData', session.get('user'))
      // call next to advance the request
      await next()
    }
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle ({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = Auth
