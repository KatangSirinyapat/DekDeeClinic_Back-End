// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContext } from "@adonisjs/http-server/build/standalone"
import { schema } from '@ioc:Adonis/Core/Validator'
import Cost from "App/Models/Cost"
import Patient from "App/Models/Patient"
import moment from "moment"


const SLASH_DMY = 'DD/MM/YYYY';
const SLASH_YMD = 'YYYY/MM/DD';
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


    public async find_range({ params }: HttpContext) {
        const costs = await Cost.all()

        let data = [];
        let i = 0;
        // console.log(params.range1);
        // console.log(params.range2);

        let cost_of_doctor = 0;
        let cost_of_medicine = 0;
        let cost_of_psychologist = 0;
        let cost_of_practitioner = 0;
        let cost_of_occupational_therapist = 0;
        let cost_of_teacher = 0;
        let bank_transfer = 0;
        let cash = 0;
        let total = 0;

        // console.log(params.range1);

        let date_range1 = moment(params.range1).utc().format(SLASH_YMD);
        let date_range2 = moment(params.range2).utc().format(SLASH_YMD);



        // let str ="";


        costs.map((item, index) => {

            console.log(item.$original.date);

            // console.log(moment(item.$original.date).format(SLASH_DMY));
            let date_cost = moment(item.$original.date).utc().format(SLASH_YMD);
            // console.log("Test:" + date_cost);
            // console.log(date_range1);
            // console.log(date_range2);


            // YYYY/MM/DD this format
            let is_between_cost = moment(date_cost).isBetween(date_range1, date_range2,'days','(]') 

            // console.log("Test_moment: " + moment('20/10/2022').isBetween('19/10/2022', '25/10/2022'));
            
            console.log(date_cost, date_range1, date_range2, is_between_cost); 



            if (is_between_cost || date_cost === date_range1 || date_cost === date_range2) {

                cost_of_doctor += item.$original.cost_of_doctor;
                cost_of_medicine += item.$original.cost_of_medicine;
                cost_of_psychologist += item.$original.cost_of_psychologist;
                cost_of_practitioner += item.$original.cost_of_practitioner;
                cost_of_occupational_therapist += item.$original.cost_of_occupational_therapist;
                cost_of_teacher += item.$original.cost_of_teacher;
                bank_transfer += item.$original.bank_transfer;
                cash += item.$original.cash;
                total += item.$original.total;

            }

        })


        console.log(total);


        const json = JSON.stringify(
            {
                "cost_of_doctor": cost_of_doctor,
                "cost_of_medicine": cost_of_medicine,
                "cost_of_psychologist": cost_of_psychologist,
                "cost_of_practitioner": cost_of_practitioner,
                "cost_of_occupational_therapist": cost_of_occupational_therapist,
                "cost_of_teacher": cost_of_teacher,
                "bank_transfer": bank_transfer,
                "cash": cash,
                "total": total
            }
        )




        return json



    }


    public async range_sum_of_year({ params }) {

        let date_range1 = moment(params.range1).utc().format(SLASH_YMD);
        let date_range2 = moment(params.range2).utc().format(SLASH_YMD);


        const patients = await Patient.all()
        const costs = await Cost.all()
        let tmp = 0;
        let count_patient = 0
        let service = 0





        // console.log(moment('2010-10-29').isBetween('2010-10-19', '2010-10-25'));
        // const my_date = '2017/07/03';
        // console.log('pass input format ::==',moment(my_date,'YYYY/MM/DD').format('DD/MM/YYYY'));




        costs.map((item) => {

            let date_cost = moment(item.date, 'YYYY/MM/DD HH:mm:ss').format(SLASH_YMD)

            // YYYY/MM/DD this format
            let is_between_cost = moment(date_cost).isBetween(date_range1, date_range2,'days','(]') 


            // console.log("----------------------");
            // console.log("Date_cost: " + date_cost);
            // console.log(date_range1, date_range2);


            if (is_between_cost || date_cost == date_range1 || date_cost == date_range2) {
                tmp += item.cost_of_doctor +
                    item.cost_of_medicine +
                    item.cost_of_occupational_therapist +
                    item.cost_of_practitioner +
                    item.cost_of_psychologist +
                    item.cost_of_teacher
            }


        })

        patients.map((item) => {
            let date_patient = moment(item.created_at).format(SLASH_YMD)
            // console.log(item.$original.created_at.DateTime);


            // console.log(moment(item.$original).format(SLASH_DMY));
            // console.log(item);


            let is_between_patient = moment(date_patient).isBetween(date_range1, date_range2,'days','(]')

            console.log("----------------------");
            // console.log("Date_patients: " + date_patient);
            // console.log(date_range1, date_range2);

            if (is_between_patient || date_patient == date_range1 || date_patient == date_range2) {
                count_patient++
                service += item.num_of_treatments
            }


        })



        return JSON.stringify({
            "sum_of_year": tmp,
            "count_of_patient": count_patient,
            "service": service
        })


    }


    public async sum_of_year() {

        const costs = await Cost.all()
        let tmp = 0;

        costs.map((item) => {
            tmp += item.cost_of_doctor +
                item.cost_of_medicine +
                item.cost_of_occupational_therapist +
                item.cost_of_practitioner +
                item.cost_of_psychologist +
                item.cost_of_teacher
            return tmp
        })

        const patients = await Patient.all()

        let count_patient = 0
        let service = 0
        patients.map((item) => {
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
