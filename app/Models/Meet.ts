import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Meet extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public Details: string

  @column()
  public Topic: string

  @column()
  public Datemeet: string

  @column()
  public Time: string

  @column()
  public Timeto: string



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras() {
    return {
      Data: {
        Details: this.$extras.Details,
        Topic: this.$extras.Topic,
        Datemeet: this.$extras.Datemeet,
        Time: this.$extras.Time,
        Timeto: this.$extras.Timeto,
      },
    }
  }
}
