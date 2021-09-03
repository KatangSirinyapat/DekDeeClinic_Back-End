// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App//Models/User'

export default class UsersController {
    
    public async index(ctx: HttpContext){
        
        // console.log(ctx);
        const user = await User.all()
        console.log(user);
        
        return  user
    }

    public async store({ request, response }:HttpContext){

        const newUserSchema = schema.create({
            // DoctorId: schema.string({ trim: true}),
            Fname: schema.string({ trim: true}),
            Lname: schema.string({ trim: true}),
            Email: schema.string({ trim: true}),
            Telephone: schema.string({ trim: true}),
            Position: schema.string({ trim: true}),
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
        const user = await User.findOrFail(params.id)
        user.Fname = body.Fname
        user.Lname = body.Lname
        user.Email = body.Email
        user.Telephone = body.Telephone
        user.Position = body.Position

        return user.save()

    }

    public async destroy({ params }){
        const user = await User.findOrFail(params.id)
        
        return user.delete()
    }

}
