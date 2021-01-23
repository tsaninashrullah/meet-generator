'use strict'

/*
|--------------------------------------------------------------------------
| FlushUsersAdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class FlushUsersAdminSeeder {
  async run () {
    const user = await User.findBy('username', 'superadmin')
    await user.delete()
  }
}

module.exports = FlushUsersAdminSeeder
