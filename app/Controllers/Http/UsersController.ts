// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Database from "@ioc:Adonis/Lucid/Database"


export default class UsersController {
    
    public async index(){
        
        // console.log(ctx);
        // const user = await User.all()
        // console.log(User.$getRelation('meets').type);

        // const user = Database
        //             .from('users')
        //             .select('*')
        //             .from('users')
        //             // .join('meets','users.id','=','meets.user_id')
        //             // .join('costs','users.id','=','costs.user_id')
        //             .where('users.id','>=','0')

        // return response.status(200).json({
        //     message: 'Successfully retrieved users.',
        //     data: user
        // })


        const users = User.query().preload('meets').preload('costs')
                    
        return  users
    }

    public async store({ request, response }:HttpContext){

      
        

        const newUserSchema = schema.create({
          
            doctor_id: schema.number(),
            fname: schema.string({ trim: true}),
            lname: schema.string({ trim: true}),
            email: schema.string({ trim: true}),
            telephone: schema.string({ trim: true}),
            position: schema.string({ trim: true}),
        })

        let all_users = User.all()
        let tmp_doctor_id=0;

        const show_log =  (await all_users).map((item,index) => {

            // Use last index from User
            if(index == 0)
            {
                console.log(index);
                tmp_doctor_id = item.doctor_id+1
            }
        })

        console.log(tmp_doctor_id);
        
    
        const payload = await request.validate({ schema: newUserSchema })

        //Init doctor_id
        payload.doctor_id = tmp_doctor_id


        const user = await User.create(payload)

        // const body = request.body();
        // const user = await User.create(body)
        response.status(201)

        return user;
        

        
    }

    public async show({ params }: HttpContext){


        // const user = await User.findOrFail(params.doctor_id)
        // User.$getRelation('meets').setRelatedForMany(User,Meet)
        // const user_meets = user.related('meets').query()
        // const user_costs = user.related('costs').query()
        // console.log(user_meets);
        // return user_meets
        
        // const user = Database
        //             .from('users')
        //             .select('*')
        //             .from('users')
        //             .join('meets','users.doctor_id','=','meets.user_id')
        //             .join('costs','users.doctor_id','=','costs.user_id')
        //             .where('users.doctor_id',params.doctor_id)

        // return user

        const user = await User.query().where('doctor_id',params.doctor_id).preload('meets').preload('costs')

        return user

    }

    public async update({ params, request, response }){
        
        

        const body = request.body()
        let user = await User.findOrFail(params.doctor_id)
        // user.doctor_id = body.doctor_id

       
       
        
        

        user.fname = body.fname
        user.lname = body.lname
        user.email = body.email
        user.telephone = body.telephone
        user.position = body.position

        // console.log(user);

        return user.save()

    }

    public async destroy({ params }){
        const user = await User.findOrFail(params.doctor_id)
        
        
        return user.delete()
    }

}
