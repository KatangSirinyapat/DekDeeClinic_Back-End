import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      //  table.increments('id',{ primaryKey: false })
       table.integer('doctor_id').notNullable().primary()
       table.string('fname', 80).notNullable()
       table.string('lname', 80).notNullable()
       table.string('email', 254)
       table.string('telephone', 20)
       table.string('position', 60)
       

      
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
