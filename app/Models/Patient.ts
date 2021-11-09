import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Meet from 'App/Models/Meet'
import Cost from 'App/Models/Cost'
export default class Patient extends BaseModel {
  // @column({ isPrimary: false })
  // public id: number

  @column({ isPrimary: true })
  public clinic_number: number

  @column()
  public fname: string

  @column()
  public lname: string

  @column()
  public gender: string

  @column()
  public bod: string

  @column()
  public age: string

  @column()
  public telephone: string

  @column()
  public drug_allergy: string

  @column()
  public congenital_disease: string

  @column()
  public home_no: string

  @column()
  public moo: string

  @column()
  public soi: string

  @column()
  public subdistrict: string

  @column()
  public district: string

  @column()
  public province: string

  @column()
  public fname_parent: string

  @column()
  public lname_parent: string

  @column()
  public relation: string
  // public NumOfTreatments: string

  @hasMany(() => Meet,{
    foreignKey: 'patient_id',
  })
  public meets: HasMany<typeof Meet>

  @hasMany(() => Cost,{
    foreignKey: 'patient_id'
  })
  public costs: HasMany<typeof Cost>




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // public serializeExtras() {
  //   return {
  //     Data: {
  //       clinic_number: this.$extras.clinic_number,
  //       fname: this.$extras.fname,
  //       lname: this.$extras.lname,
  //       gender: this.$extras.gender,
  //       bod: this.$extras.bod,
  //       age: this.$extras.age,
  //       telephone: this.$extras.telephone,
  //       drug_allergy: this.$extras.drug_allergy,
  //       congenital_disease: this.$extras.congenital_disease,
  //       home_no:this.$extras.home_no,
  //       moo: this.$extras.moo,
  //       soi: this.$extras.soi,
  //       subdistrict: this.$extras.subdistrict,
  //       district: this.$extras.district,
  //       province: this.$extras.province,
  //       fname_parent: this.$extras.fname_parent,
  //       lname_parent: this.$extras.lname_parent,
  //       relation: this.$extras.relation

  //     },
  //   }
  // }
}
