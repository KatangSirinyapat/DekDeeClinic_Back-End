/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Route.get('/user', 'UsersController.index')

Route.get('users/', 'UsersController.index')
Route.post('users/', 'UsersController.store')
Route.get('users/:doctor_id', 'UsersController.show')
Route.put('users/:doctor_id', 'UsersController.update')
Route.delete('users/:doctor_id', 'UsersController.destroy')

// Route.resource('users', 'UsersController')

Route.get('patients/','PatientsController.index')
Route.get('patients/data/:clinic_number', 'PatientsController.show_patient_data')
Route.post('patients/','PatientsController.store')
Route.get('patients/:clinic_number','PatientsController.show')
Route.put('patients/:clinic_number','PatientsController.update')
Route.delete('patients/:clinic_number','PatientsController.destroy')
// Route.resource('patients', 'PatientsController').apiOnly()

Route.resource('meets', 'MeetsController').apiOnly()


Route.get('costs/sum_of_year/','CostsController.sum_of_year')
Route.get('costs/find_range/:range1/:range2','CostsController.find_range')
Route.get('costs/range_sun_of_year/:range1/:range2','CostsController.range_sum_of_year')


// Route.shallowResource('cost/find_range/:range1&:range2','CostsController.find_range')

Route.get('costs/','CostsController.index')
Route.post('costs/','CostsController.store')
Route.get('costs/:id','CostsController.show')
Route.put('costs/:id','CostsController.update')
Route.delete('costs/:id','CostsController.destroy')

// Route.resource('costs', 'CostsController').apiOnly()

Route.resource('details', 'DetailsController').apiOnly()