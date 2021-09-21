// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Cost from "App/Models/Cost"

export default class CostsController {

    public async index(ctx: HttpContext) {
        const cost = await Cost.all()

        console.log(cost);
    
        return cost
    }

    public async store({ request, response }: HttpContext) {

        const newCostSchema = schema.create({

            Date: schema.string({ trim: true }),
            Costofdoctor: schema.string({ trim: true }),
            Costofmedicine: schema.string({ trim: true }),
            Costofpsychologist: schema.string({ trim: true }),
            Costofpractitioner: schema.string({ trim: true }),
            Costofoccupationaltherapist: schema.string({ trim: true }),
            Costofteacher: schema.string({ trim: true }),
            Banktransfer: schema.string({ trim: true }),
            Cash: schema.string({ trim: true }),
            Total: schema.string({ trim: true }),

        })
        const payload = await request.validate({ schema: newCostSchema })
        const cost = await Cost.create(payload)

        response.status(201)

        return cost
    }

    public async show({ params }:HttpContext) {
        const cost = await Cost.findOrFail(params.id)

        return cost

    }

    public async update({ params, request }:HttpContext) {

        const body = request.body()
        const cost = await Cost.findOrFail(params.id)
        

        cost.Date = body.Date
        cost.Costofdoctor = body.costofdoctor
        cost.Costofmedicine = body.costofmedicine
        cost.Costofpsychologist = body.costofpsychologist
        cost.Costofpractitioner = body.costofpractitioner
        cost.Costofoccupationaltherapist = body.costofoccupationaltherapist
        cost.Costofteacher = body.costofteacher
        cost.Banktransfer = body.Banktransfer
        cost.Cash = body.Cash
        cost.Total = body.Total



        return cost.save()


    }

    public async destroy({ params }:HttpContext) {

        const cost = await Cost.findOrFail(params.id)

        return cost.delete()

    }
}
