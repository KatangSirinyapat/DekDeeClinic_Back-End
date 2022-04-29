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

        let cost_of_doctor = 0;
        let cost_of_medicine = 0;
        let cost_of_psychologist = 0;
        let cost_of_practitioner = 0;
        let cost_of_occupational_therapist = 0;
        let cost_of_teacher = 0;
        let bank_transfer = 0;
        let cash = 0;
        let total = 0;



        let params1 = params.range1
        let params2 = params.range2

        let date_range1 = moment(params1).utc().format(SLASH_YMD);
        let date_range2 = moment(params2).utc().format(SLASH_YMD);
        // console.log(params.range1);
        // console.log(date_range1);
        // console.log(date_range2);


        let next_day_date_range1 = moment(date_range1).add(1, 'day').format('YYYY/MM/DD');
        let next_day_date_range2 = moment(date_range2).add(1, 'day').format('YYYY/MM/DD');
        
        
        
        costs.map((item, index) => {

            // console.log(item.$original.date);


            let date_cost = moment(item.$original.date).utc().format(SLASH_YMD);
            

            let  TrueDay_From_Calendar = moment(date_cost).add(1, 'day').format('YYYY/MM/DD');
            console.log("Test: " + TrueDay_From_Calendar);
            

            // YYYY/MM/DD this format
            let is_between_cost = moment(TrueDay_From_Calendar).isBetween(next_day_date_range1, next_day_date_range2, 'days', '(]')

            // console.log("Test_moment: " + moment('20/10/2022').isBetween('19/10/2022', '25/10/2022'));

            console.log(TrueDay_From_Calendar, next_day_date_range1, next_day_date_range2, is_between_cost); 



            if (is_between_cost || TrueDay_From_Calendar === next_day_date_range1 || TrueDay_From_Calendar === next_day_date_range2) {

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
        let next_day_date_range1 = moment(date_range1).add(1, 'day').format('YYYY/MM/DD');
        let next_day_date_range2 = moment(date_range2).add(1, 'day').format('YYYY/MM/DD');

        const patients = await Patient.all()
        const costs = await Cost.all()
        let tmp_cost = 0;
        let count_patient = 0
        let sum_of_service = 0

        patients.map((item) => {
            let date_patient = moment(item.created_at.toSQLDate()).format(SLASH_YMD)
            
          
            console.log(item.created_at.toSQLDate());
            
            
            
            let  TrueDay_From_Calendar = moment(date_patient).add(1, 'day').format('YYYY/MM/DD');

            // YYYY/MM/DD this format
            let is_between_patient = moment(TrueDay_From_Calendar).isBetween(next_day_date_range1, next_day_date_range2, 'days', '(]')

            console.log("----------------------");
            console.log("Date_patients: " + date_patient);
            // console.log(date_range1, date_range2);

            
            if (is_between_patient || date_patient == next_day_date_range1 || date_patient == next_day_date_range2) {
                count_patient++
                console.log("T");
                
                
            }


        })

        costs.map( (item) => {

            let date_cost = moment(item.date, 'YYYY/MM/DD').format(SLASH_YMD)
            let  TrueDay_From_Calendar = moment(date_cost).format('YYYY/MM/DD');
            // YYYY/MM/DD this format
            let is_between_cost = moment(TrueDay_From_Calendar).isBetween(next_day_date_range1, next_day_date_range2, 'days', '(]')

            if (is_between_cost || TrueDay_From_Calendar == next_day_date_range1 || TrueDay_From_Calendar == next_day_date_range2) {
              
                sum_of_service++;
              
                tmp_cost += item.cost_of_doctor +
                    item.cost_of_medicine +
                    item.cost_of_occupational_therapist +
                    item.cost_of_practitioner +
                    item.cost_of_psychologist +
                    item.cost_of_teacher;

               
            }
        })

        

        

        return JSON.stringify({
            "sum_of_year": tmp_cost,
            "count_of_patient": count_patient,
            "service": sum_of_service
        })


    }


    public async sum_of_year() {

        const costs = await Cost.all()
        let tmp = 0;
        let sum_of_service=0

        costs.map((item) => {
            tmp += item.cost_of_doctor +
                item.cost_of_medicine +
                item.cost_of_occupational_therapist +
                item.cost_of_practitioner +
                item.cost_of_psychologist +
                item.cost_of_teacher
            sum_of_service++;
            
            return tmp
        })

        const patients = await Patient.all()

        let count_patient = 0
        
        patients.map((item) => {
            count_patient++
            // service += item.num_of_treatments
        })




        return JSON.stringify({
            "sum_of_year": tmp,
            "count_of_patient": count_patient,
            "service": sum_of_service
        })

    }
}
