'use strict'
const { validateAll } = use('Validator')
const moment = use('moment-timezone')
const Meeting = use('App/Models/Meeting')

class DashboardController {
  async index({ view }) {
    return view.render('dashboard.index')
  }

  async storeSchedule({ request, response, session }) {
    const payloadBody = request.all()
    const validation = await validateAll(payloadBody, {
      start_date: 'required',
      end_date: 'required'
    }, {
      'start_date.required': 'Start date is required.',
      'end_date.required': 'End date is required.'
    })
    if (validation.fails()) {
      return response.status(400).json({
        errors: validation.messages()
      })
    } else {
      const payload = { user_id: session.get('user').id, start_date: moment(payloadBody.start_date).tz('Asia/Jakarta').utc().format('YYYY-MM-DD HH:mm'), end_date: moment(payloadBody.end_date).tz('Asia/Jakarta').utc().format('YYYY-MM-DD HH:mm'), ...request.only(['description']) }
      console.log(payload, "------SCHEDULE-----")
      const schedule = await Meeting.create(payload)
      return response.json({
        schedule: schedule.id
      })
    }
  }
  
  async instantMeeting({ request, response, session }) {
    const payload = {
      user_id: session.get('user').id,
      start_date: moment().format('YYYY-MM-DD HH:mm'),
      end_date: moment().add(4, 'hours').format('YYYY-MM-DD HH:mm'),
    }
    const schedule = await Meeting.create(payload)
    console.log(payload, "------INSTANT-----")
    return response.json({
      schedule: schedule.id
    })
  }

  async datatable({ request, response, session }) {
    const payload = request.get()
    let query = Meeting.query().select(['start_date', 'end_date', 'id']).where('user_id', '=', session.get('user').id)
    if (payload.search.value != '') {
      query.where('id', 'like', `%${payload.search.value}%`)
    }
    const count = await query.getCount()
    const data = await query.orderBy('start_date', 'desc').offset(parseInt(payload.start)).limit(parseInt(payload.length)).fetch()
    // console.log(data, "----DATA")
    return response.json({
      data,
      recordsFiltered: count,
      recordsTotal: count
    })
  }
}

module.exports = DashboardController
