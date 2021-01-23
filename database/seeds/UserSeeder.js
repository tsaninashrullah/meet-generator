'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
class UserSeeder {
  async run() {
    const roleRecord = await Role.findOrCreate({ slug: 'superadmin' }, {
      slug: 'superadmin',
      permissions: '',
      name: 'Super Admin'
    })
    await User.findOrCreate({ username: 'superadmin' }, {
      username: 'superadmin',
      password: '12345678',
      email: 'superadmin@tsaninselasa.xyz',
      full_name: 'Super Admin',
      role_id: roleRecord.id
    })
    await User.findOrCreate({ username: 'creator1' }, {
      username: 'creator1',
      password: '12345678',
      email: 'creator1@tsaninselasa.xyz',
      full_name: 'Creator 1',
      role_id: roleRecord.id
    })
    await User.findOrCreate({ username: 'creator2' }, {
      username: 'creator2',
      password: '12345678',
      email: 'creator2@tsaninselasa.xyz',
      full_name: 'Creator 2',
      role_id: roleRecord.id
    })
  }
}

module.exports = UserSeeder
