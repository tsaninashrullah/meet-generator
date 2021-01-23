'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GeneralSettingSchema extends Schema {
  up () {
    this.create('general_settings', (table) => {
      table.increments()
      table.string('key').unique().notNullable()
      table.string('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('general_settings')
  }
}

module.exports = GeneralSettingSchema
