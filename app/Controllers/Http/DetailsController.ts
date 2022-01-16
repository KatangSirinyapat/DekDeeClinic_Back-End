// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Details from 'App/Models/Details'

export default class DetailsController {


    public async index() {

        const details = await Details.all()

        return details
    }

    public async store({ request, response }: HttpContext) {

        const newDetailsSchema = schema.create({

            weight: schema.string({ trim: true }),
            high: schema.string({ trim: true }),
            bp: schema.string({ trim: true }),
            bt: schema.string({ trim: true }),
            pr: schema.string({ trim: true }),
            rr: schema.string({ trim: true }),
            symptom: schema.string({ trim: true }),
            patient_id: schema.number()
        })
        const payload = await request.validate({ schema: newDetailsSchema })
        const detail = await Details.create(payload)

        response.status(201)


        return detail
    }

    public async show({ params }: HttpContext) {

        const detail = await Details.findOrFail(params.id)

        return detail
    }

    public async update({ params, request }: HttpContext) {

        const body = request.body()
        const details = await Details.findOrFail(params.id)

        details.weight = body.weight
        details.high = body.high
        details.bp = body.bp
        details.bt = body.bt
        details.pr = body.pr
        details.rr = body.rr
        details.symptom = body.symptom

        return details.save()
    }

    public async destroy({ params }: HttpContext) {

        const detail = await Details.findOrFail(params.id)

        return detail.delete()
    }


}
