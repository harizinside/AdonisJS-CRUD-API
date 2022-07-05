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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController'

Route.post('/auth/register', async ({ request }) => {
  return new AuthController().processRegister(request)
})

Route.post('/auth/login', async ({ auth, request }) => {
  return new AuthController().processLogin(auth, request)
})

Route.get('/auth/logout', async ({ auth }) => {
  await auth.use('api').revoke()
  return {
    revoked: true
  }
})

Route.group(() => {

}).middleware('auth')

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
