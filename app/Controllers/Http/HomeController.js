'use strict'
const Meeting = use('App/Models/Meeting')
const moment = use('moment')

class HomeController {
  async search({ request, response }) {
    const roomCode = request.get().roomCode
    let recordMeeting = null
    if (typeof roomCode != 'undefined' && roomCode != null && roomCode != '') {
      recordMeeting = await Meeting.query().select(['id', 'description', 'start_date', 'end_date']).where('id', '=', roomCode).first()
    }
    return response.json({
      data: recordMeeting
    })
  }
  async datatable({ request, response }) {
    const payload = request.get()
    let query = Meeting.query()
      .select(['start_date', 'end_date', 'meetings.id', 'description', 'user_id'])
    if (payload.search.value != '') {
      query.where('id', 'like', `%${payload.search.value}%`)
        .orWhere('description', 'like', `%${payload.search.value}%`)
    }
    const count = await query.getCount()
    const data = await query
      .with('user', (builder) => {
        builder.select('id', 'full_name')
      }).orderBy('start_date', 'desc').offset(parseInt(payload.start)).limit(parseInt(payload.length)).fetch()
    return response.json({
      data,
      recordsFiltered: count,
      recordsTotal: count
    })
  }

  async join({request, response, view}, d, b) {
    const data = await Meeting.query().select(['id', 'start_date', 'end_date']).where('id', '=', request.params.roomCode).first()
    let errorMessage = ''
    if (data == null) {
      errorMessage = 'Room meeting not found'
    } else {
      const startDate = moment(data.start_date)
      const endDate = moment(data.end_date)
      if (moment() < startDate) {
        errorMessage = 'Meeting isnt started yet.'
      } else if (moment() > endDate) {
        errorMessage = 'Meeting was expired'
      }
    }
    if (errorMessage != '') {
      return view.render('message', {
        message: errorMessage
      })
    } else {
      return view.render('join', {
        data,
      })
    }
  }
}

module.exports = HomeController
