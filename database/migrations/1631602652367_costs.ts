import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Costs extends BaseSchema {
  protected tableName = 'costs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('Date')
      table.string('Costofdoctor')
      table.string('Costofmedicine')
      table.string('Costofpsychologist')
      table.string('Costofpractitioner')
      table.string('Costofoccupationaltherapist')
      table.string('Costofteacher')
      table.string('Banktransfer')
      table.string('Cash')
      table.string('Total')

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
