import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cost extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public Date: string

  @column()
  public Costofdoctor: string

  @column()
  public Costofmedicine: string

  @column()
  public Costofpsychologist: string

  @column()
  public Costofpractitioner: string

  @column()
  public Costofoccupationaltherapist: string

  @column()
  public Costofteacher: string

  @column()
  public Banktransfer: string

  @column()
  public Cash: string

  @column()
  public Total: string



   

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras() {
    return {
      Data: {
        Date: this.$extras.Date,
        Costofdoctor: this.$extras.Costofdoctor,
        Costofmedicine: this.$extras.Costofmedicine,
        Costofpsychologist: this.$extras.Costofpsychologist,
        Costofpractitioner: this.$extras.Costofpractitioner,
        Costofoccupationaltherapist: this.$extras.Costofoccupationaltherapist,
        Costofteacher: this.$extras.Costofteacher,
        Banktransfer: this.$extras.Banktransfer,
        Cash: this.$extras.Cash,
        Total: this.$extras.Total,
      },
    }
  }
}
