import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Meets extends BaseSchema {
  protected tableName = 'meets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('details',100).notNullable()
      table.string('topic',100).notNullable()
      table.dateTime('date_meet').notNullable()
      table.time('time').notNullable()
      table.time('time_to').notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('patient_id').unsigned().notNullable().references('id').inTable('patients')

      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


