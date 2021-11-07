import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Costs extends BaseSchema {
  protected tableName = 'costs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.dateTime('date')
      table.integer('cost_of_doctor')
      table.integer('cost_of_medicine')
      table.integer('cost_of_psychologist')
      table.integer('cost_of_practitioner')
      table.integer('cost_of_occupational_therapist')
      table.integer('cost_of_teacher')
      table.integer('bank_transfer')
      table.integer('cash')
      table.integer('total')
      table.integer('user_id').notNullable().references('doctor_id').inTable('users')
      table.integer('patient_id').notNullable().references('clinic_number').inTable('patients')

   
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
