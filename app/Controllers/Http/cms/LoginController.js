'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')

class LoginController {
  async login({ view }) {
    return view.render('login')
  }

  async authenticate({ request, response, session }) {
    const payloadBody = request.body
    const userRecord = await User.query().select('id', 'password', 'username', 'email', 'full_name').where('email', payloadBody.credential).orWhere('username', payloadBody.credential).limit().first()
    if (userRecord !== null && await Hash.verify(payloadBody.password, userRecord.password)) {
      session.put('user', userRecord.toJSON())
      return response.redirect('/dashboard')
    } else {
      session.flash({
        notification: 'Credential not match'
      })
      return response.redirect('back')
    }
  }

  async destroySession({session, response}) {
    session.forget('user')
    response.redirect('/login')
  }
}

module.exports = LoginController
