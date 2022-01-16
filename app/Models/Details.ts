import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Patient from 'App/Models/Patient'

export default class Details extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public patient_id: number


  @column()
  public weight: string

  @column()
  public high: string

  @column()
  public bp: string

  @column()
  public bt: string

  @column()
  public pr: string

  @column()
  public rr: string

  @column()
  public symptom: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Patient, {
    localKey: 'patient_id'
  })
  public patient: BelongsTo<typeof Patient>
}
