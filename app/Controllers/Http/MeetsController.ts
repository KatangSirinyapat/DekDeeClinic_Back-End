// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Meet from "App/Models/Meet"
// import Patient from "App/Models/Patient"
// import User from 'App/Models/User'


export default class MeetsController {

    public async index() {
        const meet = await Meet.all()

        // console.log(meet);
        
        // console.log(Meet.$getRelation('user').relatedModel());

        
      
        return meet
    }

    public async store({ request, response }: HttpContext) {

        const newMeetSchema = schema.create({

            details: schema.string({ trim: true }),
            topic: schema.string({ trim: true }),
            date_meet: schema.string(),
            time: schema.string(),
            time_to: schema.string(),
            user_id: schema.number(),
            patient_id: schema.number(),

        })
        const payload = await request.validate({ schema: newMeetSchema })
        const meet = await Meet.create(payload)

        

        response.status(201)

        
        
        return meet
    }

    public async show({ params }:HttpContext) {
        const meet = await Meet.findOrFail(params.id)

        
        // console.log(meet.merge.name);
        


        return meet

    }

    public async update({ params, request }:HttpContext) {

        const body = request.body()
        const meet = await Meet.findOrFail(params.id)
        
        meet.details = body.details
        meet.topic = body.topic
        meet.date_meet = body.date_meet
        meet.time = body.time
        meet.time_to = body.time_to

        return meet.save()


    }

    public async destroy({ params }:HttpContext) {

        const meet = await Meet.findOrFail(params.id)

        return meet.delete()

    }
}