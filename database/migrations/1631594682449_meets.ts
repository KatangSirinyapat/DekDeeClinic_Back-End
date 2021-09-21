import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Meets extends BaseSchema {
  protected tableName = 'meets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('Details',100).notNullable()
      table.string('Topic',100).notNullable()
      table.string('Datemeet',20).notNullable()
      table.string('Time',20).notNullable()
      table.string('Timeto',20).notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


