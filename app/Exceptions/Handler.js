'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response, session }) {
    if (error.name === 'ValidationException') {
      if (request.is(['application/*']) === 'application/json') {
        return response.defaultResponseJson(400, error.messages[0].message)
      } else {
        session.withErrors(error.messages).flashAll()
        await session.commit()
        return response.redirect('back')
      }
    }
    if (request.is(['application/*']) === 'application/json') {
      response.defaultResponseJson(500, 'Something went wrong')
    } else {
      return super.handle(...arguments)
    }

  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    console.error(error)
  }
}

module.exports = ExceptionHandler
