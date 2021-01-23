'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetingSchema extends Schema {
  up () {
    this.create('meetings', (table) => {
      table.uuid('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }
}

module.exports = MeetingSchema
