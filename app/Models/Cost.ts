import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column,  } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Patient from 'App/Models/Patient'

export default class Cost extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public patient_id: number

  @column()
  public date: string

  @column()
  public cost_of_doctor: number

  @column()
  public cost_of_medicine: number

  @column()
  public cost_of_psychologist: number

  @column()
  public cost_of_practitioner: number

  @column()
  public cost_of_occupational_therapist: number

  @column()
  public cost_of_teacher: number

  @column()
  public bank_transfer: number

  @column()
  public cash: number

  @column()
  public total: number

  @belongsTo(() => User,{
    localKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Patient,{
    localKey: 'patient_id'
  })
  public patient: BelongsTo<typeof Patient>

  



   

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // public serializeExtras() {
  //   return {
  //     Data: {
  //       date: this.$extras.date,
  //       cost_of_doctor: this.$extras.cost_of_doctor,
  //       cost_of_medicine: this.$extras.cost_of_medicine,
  //       cost_of_psychologist: this.$extras.cost_of_psychologist,
  //       cost_of_practitioner: this.$extras.cost_of_practitioner,
  //       cost_of_occupational_therapist: this.$extras.cost_of_occupational_therapist,
  //       cost_of_teacher: this.$extras.cost_of_teacher,
  //       bank_transfer: this.$extras.bank_transfer,
  //       cash: this.$extras.cash,
  //       total: this.$extras.total,
  //     },
  //   }
  // }
}
