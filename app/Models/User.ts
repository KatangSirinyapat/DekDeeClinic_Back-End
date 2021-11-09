import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Meet from 'App/Models/Meet'
import Cost from 'App/Models/Cost'

export default class User extends BaseModel {

  // @column({ isPrimary: false })
  // public id: number

  @column({ isPrimary: true })
  public doctor_id: number

  @column()
  public fname: string

  @column()
  public lname: string

  @column()
  public email: string

  @column()
  public telephone: string

  @column()
  public position: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasMany(() => Meet, {
    foreignKey: 'user_id',
  })
  public meets: HasMany<typeof Meet>

  @hasMany(() => Cost, {
    foreignKey: 'user_id',
  })
  public costs: HasMany<typeof Cost>

  // public serializeExtras = true
  // public serializeExtras() {
  //   return {
  //     Data: {
  //       id: this.$extras.id,
  //       doctor_id: this.$extras.doctor_id,
  //       fname: this.$extras.fname,
  //       lname: this.$extras.lname,
  //       email: this.$extras.email,
  //       telephone: this.$extras.telephone,
  //       position: this.$extras.position

  //     },
  //   }
  // }
}
