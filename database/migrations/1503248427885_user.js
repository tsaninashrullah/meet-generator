'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('slug', 80).notNullable().unique()
      table.string('name', 80).notNullable()
      table.text('permissions')
      table.timestamps()
    })
    this.create('users', (table) => {
      table.increments()
      table.integer('role_id').notNullable()
      table.string('full_name', 80).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
    // this.alter('users', (table) => {
    //   table.integer('role_id').alter().notNullable().references('id').inTable('roles')
    // })
  }

  down () {
    // this.raw('ALTER TABLE users DROP CONSTRAINT users_role_id_foreign')
    this.drop('roles')
    this.drop('users')
  }
}

module.exports = UserSchema
