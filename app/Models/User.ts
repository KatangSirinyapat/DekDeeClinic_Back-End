import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  // @column()
  // public DoctorId: string

  @column()
  public Fname: string

  @column()
  public Lname: string

  @column()
  public Email: string

  @column()
  public Telephone: string

  @column()
  public Position: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  // public serializeExtras = true
  public serializeExtras() {
    return {
      Data: {
        Fname: this.$extras.Fname,
        Lname: this.$extras.Lname,
        Email: this.$extras.Email,
        Telephone: this.$extras.Telephone,
        Position: this.$extras.Position

      },
    }
  }
}
