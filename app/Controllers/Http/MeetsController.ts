// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Meet from "App/Models/Meet"


export default class MeetsController {

    public async index(ctx: HttpContext) {
        const meet = await Meet.all()

        console.log(meet);
        

        return meet
    }

    public async store({ request, response }: HttpContext) {

        const newMeetSchema = schema.create({

            Details: schema.string({ trim: true }),
            Topic: schema.string({ trim: true }),
            Datemeet: schema.string({ trim: true }),
            Time: schema.string({ trim: true }),
            Timeto: schema.string({ trim: true }),

        })
        const payload = await request.validate({ schema: newMeetSchema })
        const meet = await Meet.create(payload)

        response.status(201)

        return meet
    }

    public async show({ params }:HttpContext) {
        const meet = await Meet.findOrFail(params.id)

        return meet

    }

    public async update({ params, request }:HttpContext) {

        const body = request.body()
        const meet = await Meet.findOrFail(params.id)
        
        meet.Details = body.Details
        meet.Topic = body.Topic
        meet.Datemeet = body.Datemeet
        meet.Time = body.Time
        meet.Timeto = body.Timeto

        return meet.save()


    }

    public async destroy({ params }:HttpContext) {

        const meet = await Meet.findOrFail(params.id)

        return meet.delete()

    }
}