import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Patient from 'App/Models/Patient'
export default class Meet extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public patient_id: number

  @column()
  public details: string

  @column()
  public topic: string

  @column()
  public date_meet: string

  @column()
  public time: string

  @column()
  public time_to: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => User, {
    localKey: 'user_id'
  })
  public user: BelongsTo<typeof User>
  

  @belongsTo(() => Patient, {
    localKey: 'patient_id'
  })
  public patient: BelongsTo<typeof Patient>



  // public serializeExtras() {
  //   return {
  //     Data: {
        
  //       id: this.$extras.id,
  //       details: this.$extras.details,
  //       topic: this.$extras.topic,
  //       date_meet: this.$extras.date_meet,
  //       time: this.$extras.time,
  //       time_to: this.$extras.time_to,
  //       user_id: this.$extras.user_id
  //     },
  //   }
  // }
}
