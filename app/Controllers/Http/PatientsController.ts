// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Patient from "App/Models/Patient"


export default class PatientsController {

    public async index(ctx: HttpContext) {
        const patient = await Patient.all()

        console.log(patient);
        

        return patient
    }

    public async store({ request, response }: HttpContext) {

        const newPatientSchema = schema.create({

            Clinicnumber: schema.string({ trim: true }),
            Fname: schema.string({ trim: true }),
            Lname: schema.string({ trim: true }),
            Gender: schema.string({ trim: true }),
            Bod: schema.string({ trim: true }),
            Age: schema.string({ trim: true }),
            Telephone: schema.string({ trim: true }),
            Drugallergy: schema.string({ trim: true }),
            Congenitaldisease: schema.string({ trim: true }),
            Homeno: schema.string({ trim: true }),
            Moo: schema.string({ trim: true }),
            Soi: schema.string({ trim: true }),
            Subdistrict: schema.string({ trim: true }),
            District: schema.string({ trim: true }),
            Province: schema.string({ trim: true }),
            Fnameparent: schema.string({ trim: true }),
            Lnameparent: schema.string({ trim: true }),
            Relation: schema.string({ trim: true }),
            // NumOfTreatments: schema.string({ trim: true }),

        })
        const payload = await request.validate({ schema: newPatientSchema })
        const patient = await Patient.create(payload)

        response.status(201)

        return patient
    }

    public async show({ params }:HttpContext) {
        const patient = await Patient.findOrFail(params.id)

        return patient

    }

    public async update({ params, request }:HttpContext) {

        const body = request.body()
        const patient = await Patient.findOrFail(params.id)
        
        patient.Clinicnumber = body.Clinicnumber
        patient.Fname = body.Fname
        patient.Lname = body.Lname
        patient.Gender = body.Gender
        patient.Bod = body.Bod
        patient.Age = body.Age
        patient.Telephone = body.Telephone
        patient.Drugallergy = body.Drugallergy
        patient.Congenitaldisease = body.Congenitaldisease
        patient.Homeno = body.Homeno
        patient.Moo = body.Moo
        patient.Soi = body.Soi
        patient.Subdistrict = body.Subdistrict
        patient.District = body.District
        patient.Province = body.Province
        patient.Fnameparent = body.Fnamepatent
        patient.Lnameparent = body.Lnameparent
        patient.Relation = body.Relation

        return patient.save()


    }

    public async destroy({ params }:HttpContext) {

        const patient = await Patient.findOrFail(params.id)

        return patient.delete()

    }
}