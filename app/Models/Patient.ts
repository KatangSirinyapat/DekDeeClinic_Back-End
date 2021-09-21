import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public Clinicnumber: string

  @column()
  public Fname: string

  @column()
  public Lname: string

  @column()
  public Gender: string

  @column()
  public Bod: string

  @column()
  public Age: string

  @column()
  public Telephone: string

  @column()
  public Drugallergy: string

  @column()
  public Congenitaldisease: string

  @column()
  public Homeno: string

  @column()
  public Moo: string

  @column()
  public Soi: string

  @column()
  public Subdistrict: string

  @column()
  public District: string

  @column()
  public Province: string

  @column()
  public Fnameparent: string

  @column()
  public Lnameparent: string

  @column()
  public Relation: string
  // public NumOfTreatments: string




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras() {
    return {
      Data: {
        Clinicnumber: this.$extras.Clinicnumber,
        Fname: this.$extras.Fname,
        Lname: this.$extras.Lname,
        Gender: this.$extras.Gender,
        Bod: this.$extras.Bod,
        Age: this.$extras.Age,
        Telephone: this.$extras.Telephone,
        Drugallergy: this.$extras.Drugallergy,
        Congenitaldisease: this.$extras.Congenitaldisease,
        Homeno:this.$extras.Homeno,
        Moo: this.$extras.Moo,
        Soi: this.$extras.Soi,
        Subdistrict: this.$extras.Subdistrict,
        District: this.$extras.District,
        Province: this.$extras.Province,
        Fnameparent: this.$extras.Fnameparent,
        Lnameparent: this.$extras.Lnameparent,
        Relation: this.$extras.Relation

      },
    }
  }
}
