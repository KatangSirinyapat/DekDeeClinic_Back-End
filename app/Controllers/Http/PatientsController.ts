// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Patient from "App/Models/Patient"
// import User from "App/Models/User"
// import Meet from "App/Models/Meet"
// import Database from "@ioc:Adonis/Lucid/Database"


export default class PatientsController {

    public async index() {
        // const patient = await Patient.all()

        // console.log(patient);

        const patients = await Patient.query().preload('meets').preload('costs').preload('details')


        return patients
    }

    public async store({ request, response }: HttpContext) {


        const newPatientSchema = schema.create({

            clinic_number: schema.number(),
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
            num_of_treatments: schema.number(),
            // NumOfTreatments: schema.string({ trim: true }),

        })
        
        let all_patients = Patient.all()
        let tmp_patient_id = 2001;

        (await all_patients).map((item,index) => {

            if(index == 0)
            {
                
                tmp_patient_id  = item.clinic_number+1
            }

        })

        const payload = await request.validate({ schema: newPatientSchema })

        //Init Patient clinic_number

        payload.clinic_number = tmp_patient_id
        const patient = await Patient.create(payload)

        response.status(201)

        return patient
    }

    public async show({ params }: HttpContext) {
        // const patient = await Patient.findOrFail(params.id)
        // return patient

        // const patient = Database
        //                 .from('patients')
        //                 .select('*')
        //                 .join('costs','patients.clinic_number','=','costs.patient_id')
        //                 .join('meets','patients.clinic_number','=','meets.patient_id')
        //                 .where('patients.clinic_number', params.clinic_number)

        const patient = await Patient.query().where('clinic_number', params.clinic_number).preload('costs').preload('meets').preload('details')



        return patient
    }

    public async show_patient_data({ params }) {

        // const patient = await Patient.query().select('*').where('clinic_number', params.clinic_number)

        const patient1 = await Patient.findOrFail(params.clinic_number)
        patient1.num_of_treatments = patient1.num_of_treatments + 1
        // const user = await User.query().preload('meets')
        // const meet = await Meet.query().where('patient_id', params.clinic_number)

        //  const user1 = Database
        //             .from('users')
        //             .select('fname', 'lname', 'doctor_id', 'meets.user_id')
        //             .join('meets','doctor_id','=','meets.user_id')
        // .where('meets.user_id','=','doctor_id')


        // const searchCriteria = {
        //     fname: 'เด็กดี',
        //   }

        //   const savePayload = {

        //     fname: 'เด็กดี',
        //     lname: 'ซื่อตรง'
        //   }

        //   const patient = await Patient.firstOrNew(searchCriteria,savePayload)

        const patient = await Patient.query().where('clinic_number', params.clinic_number).preload('costs')
        let count = 0;

        patient.map((item, index) => {
            if (item.costs) {

                item.costs.map(() => {
                    count++;
                    console.log("Test");
                })

            }
        })


        // patient1.num_of_treatments = count
        // patient1.save()


        return patient1
    }

    public async update({ params, request }: HttpContext) {

        const body = request.body()
        const patient = await Patient.findOrFail(params.clinic_number)

        // patient.clinic_number = body.clinic_number
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

        patient.save()

        return patient


    }

    public async destroy({ params }: HttpContext) {

        const patient = await Patient.findOrFail(params.clinic_number)

        return patient.delete()

    }


    public async count_num_of_treatments({ params }) {

        const patient = await Patient.query().where('clinic_number', params.clinic_number).preload('costs')
        let count = 0;

        patient.map((item, index) => {
            count++;
        })



    }
}