import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Patients extends BaseSchema {
  protected tableName = 'patients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('Clinicnumber' , 10).notNullable()
      table.string('Fname', 40).notNullable()
      table.string('Lname', 40).notNullable()
      table.string('Gender', 10)
      table.string('Bod', 20)
      table.string('Age', 10)
      table.string('Telephone', 10)
      table.string('Drugallergy', 30)
      table.string('Congenitaldisease', 80)
      table.string('Homeno', 10)
      table.string('Moo', 10)
      table.string('Soi', 20)
      table.string('Subdistrict', 20)
      table.string('District', 20)
      table.string('Province', 20)
      table.string('Fnameparent', 80)
      table.string('Lnameparent', 80)
      table.string('Relation', 40)
      // table.string('NumOfTreatments')

     


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
