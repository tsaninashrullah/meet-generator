'use strict'

class ScheduleRequest {
  get formatter () {
    return 'jsonapi'
  }
  get rules() {
    return {
      start_date: 'required',
      end_date: 'required',
      description: 'required'
    }
  }

  get messages() {
    return {
      'start_date.required': Antl.formatMessage('validation.required', {
        parameter: 'Start Date'
      }),
      'end_date.required': Antl.formatMessage('validation.required', {
        parameter: 'End Date'
      })
    }
  }
}

module.exports = ScheduleRequest
