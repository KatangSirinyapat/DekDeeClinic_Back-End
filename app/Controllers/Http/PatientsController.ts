// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Patient from "App/Models/Patient"


export default class PatientsController {

    public async index() {
        const patient = await Patient.all()

        console.log(patient);
        

        return patient
    }

    public async store({ request, response }: HttpContext) {

        const newPatientSchema = schema.create({

            clinic_number: schema.string({ trim: true }),
            fname: schema.string({ trim: true }),
            lname: schema.string({ trim: true }),
            gender: schema.string({ trim: true }),
            bod: schema.string({ trim: true }),
            age: schema.string({ trim: true }),
            telephone: schema.string({ trim: true }),
            drug_allergy: schema.string({ trim: true }),
            congenital_disease: schema.string({ trim: true }),
            home_no: schema.string({ trim: true }),
            moo: schema.string({ trim: true }),
            soi: schema.string({ trim: true }),
            subdistrict: schema.string({ trim: true }),
            district: schema.string({ trim: true }),
            province: schema.string({ trim: true }),
            fname_parent: schema.string({ trim: true }),
            lname_parent: schema.string({ trim: true }),
            relation: schema.string({ trim: true }),
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
        
        patient.clinic_number = body.clinic_number
        patient.fname = body.fname
        patient.lname = body.lname
        patient.gender = body.gender
        patient.bod = body.bod
        patient.age = body.age
        patient.telephone = body.telephone
        patient.drug_allergy = body.drug_allergy
        patient.congenital_disease = body.congenital_disease
        patient.home_no = body.home_no
        patient.moo = body.moo
        patient.soi = body.soi
        patient.subdistrict = body.subdistrict
        patient.district = body.district
        patient.province = body.province
        patient.fname_parent = body.fname_patent
        patient.lname_parent = body.lname_parent
        patient.relation = body.relation

        await patient.save()

        return patient


    }

    public async destroy({ params }:HttpContext) {

        const patient = await Patient.findOrFail(params.id)

        return patient.delete()

    }
}