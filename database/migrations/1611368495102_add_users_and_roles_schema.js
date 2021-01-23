'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Hash = use('Hash')

class AddUsersAndRolesSchema extends Schema {
  async up () {
    const password = await Hash.make("12345678")
    this.raw("INSERT INTO roles (slug, name, permissions, created_at, updated_at) values ('superadmin', 'Super Admin', null, now(), now())")
    console.log("INSERT INTO roles (slug, name, permissions, created_at, updated_at) values ('superadmin', 'Super Admin', null, now(), now())")
    this.raw(`INSERT INTO users (role_id, full_name, username, email, password, created_at, updated_at) values ('1', 'Super Admin', 'superadmin', 'superadmin@tsaninselasa.xyz', '${password}', now(), now()), ('1', 'Creator 1', 'creator1', 'creator1@tsaninselasa.xyz', '${password}', now(), now()), ('1', 'Creator 2', 'creator2', 'creator2@tsaninselasa.xyz', '${password}', now(), now())`)
    console.log(`INSERT INTO users (role_id, full_name, username, email, password, created_at, updated_at) values ('1', 'Super Admin', 'superadmin', 'superadmin@tsaninselasa.xyz', '${password}', now(), now()), ('1', 'Creator 1', 'creator1', 'creator1@tsaninselasa.xyz', '${password}', now(), now()), ('1', 'Creator 2', 'creator2', 'creator2@tsaninselasa.xyz', '${password}', now(), now())`)
  }

  down () {
    this.table('add_users_and_roles', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddUsersAndRolesSchema
