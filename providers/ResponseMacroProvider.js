'use strict'
const { ServiceProvider } = require('@adonisjs/fold')

class ResponseMacroProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Response = use('Adonis/Src/Response')
    Response.macro('defaultResponseJson', function (status, message, data={}, codeMeta = null) {
      this.status(status).json({
        meta: {
          message: message,
          status: (status >= 200 && status < 300) ? 'success' : 'failed',
          code: codeMeta !== null ? codeMeta : status
        },
        data,
      })
    })
  }
}

module.exports = ResponseMacroProvider
