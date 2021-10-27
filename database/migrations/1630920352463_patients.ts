import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Patients extends BaseSchema {
  protected tableName = 'patients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('clinic_number' , 10).notNullable()
      table.string('fname', 40).notNullable()
      table.string('lname', 40).notNullable()
      table.string('gender', 10)
      table.string('bod')
      table.string('age')
      table.string('telephone', 10)
      table.string('drug_allergy', 30)
      table.string('congenital_disease', 80)
      table.string('home_no', 10)
      table.string('moo', 10)
      table.string('soi', 20)
      table.string('subdistrict', 20)
      table.string('district', 20)
      table.string('province', 20)
      table.string('fname_parent', 80)
      table.string('lname_parent', 80)
      table.string('relation', 40)
      // table.string('NumOfTreatments')

     


  
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
