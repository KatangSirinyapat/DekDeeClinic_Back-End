// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Cost from "App/Models/Cost"
import Patient from "App/Models/Patient"

export default class CostsController {

    public async index() {
        const costs = await Cost.all()


        return costs
    }

    public async store({ request, response }: HttpContext) {

        const newCostSchema = schema.create({

            date: schema.string({ trim: true }),
            cost_of_doctor: schema.number(),
            cost_of_medicine: schema.number(),
            cost_of_psychologist: schema.number(),
            cost_of_practitioner: schema.number(),
            cost_of_occupational_therapist: schema.number(),
            cost_of_teacher: schema.number(),
            bank_transfer: schema.number(),
            cash: schema.number(),
            total: schema.number(),
            user_id: schema.number(),
            patient_id: schema.number(),

        })
        const payload = await request.validate({ schema: newCostSchema })
        const cost = await Cost.create(payload)

        response.status(201)

        return cost
    }

    public async show({ params }: HttpContext) {

        const cost = await Cost.findOrFail(params.id)

        return cost

    }

    public async update({ params, request }: HttpContext) {

        const body = request.body()
        const cost = await Cost.findOrFail(params.id)


        cost.date = body.date
        cost.cost_of_doctor = body.cost_of_doctor
        cost.cost_of_medicine = body.cost_of_medicine
        cost.cost_of_psychologist = body.cost_of_psychologist
        cost.cost_of_practitioner = body.cost_of_practitioner
        cost.cost_of_occupational_therapist = body.cost_of_occupational_therapist
        cost.cost_of_teacher = body.cost_of_teacher
        cost.bank_transfer = body.bank_transfer
        cost.cash = body.cash
        cost.total = body.total



        return cost.save()


    }

    public async destroy({ params }: HttpContext) {

        const cost = await Cost.findOrFail(params.id)

        return cost.delete()

    }

    public async sum_of_year() {

        const costs = await Cost.all()
        let tmp = 0;

        costs.map((item, index) => {
            tmp += item.cost_of_doctor +
                item.cost_of_medicine +
                item.cost_of_occupational_therapist +
                item.cost_of_practitioner +
                item.cost_of_psychologist +
                item.cost_of_teacher
            return tmp
        })

        const patients = await Patient.all()

        let count_patient =0
        let service =0
        patients.map((item,index) => {
            count_patient++
            service += item.num_of_treatments
        })



        return JSON.stringify({
            "sum_of_year": tmp,
            "count_of_patient": count_patient,
            "service": service
        })

    }
}
