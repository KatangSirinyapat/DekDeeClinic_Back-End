// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext, Request } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
    
    public async index(){
        
        // console.log(ctx);
        const user = await User.all()
        // console.log(User.$getRelation('meets').type);
        
        return  user
    }

    public async store({ request, response }:HttpContext){

        const newUserSchema = schema.create({
            doctor_id: schema.string({ trim: true}),
            fname: schema.string({ trim: true}),
            lname: schema.string({ trim: true}),
            email: schema.string({ trim: true}),
            telephone: schema.string({ trim: true}),
            position: schema.string({ trim: true}),
        })

        const payload = await request.validate({ schema: newUserSchema })
        const user = await User.create(payload)

        // const body = request.body();
        // const user = await User.create(body)
        response.status(201)

        return user;
        

        
    }

    public async show({ params }: HttpContext){
        const user = await User.findOrFail(params.id)

        

        return user

    }

    public async update({ params, request }){
        
        

        const body = request.body()
        let user = await User.findOrFail(params.id)
        user.doctor_id = body.doctor_id
        user.fname = body.fname
        user.lname = body.lname
        user.email = body.email
        user.telephone = body.telephone
        user.position = body.position

        // console.log(user);

        return user.save()

    }

    public async destroy({ params }){
        const user = await User.findOrFail(params.id)
        
        
        return user.delete()
    }

}
