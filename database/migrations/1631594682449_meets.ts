import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Meets extends BaseSchema {
  protected tableName = 'meets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('details',100).notNullable()
      table.string('topic',100).notNullable()
      table.string('date_meet').notNullable().unique()
      table.string('time').notNullable()
      table.string('time_to').notNullable()
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


