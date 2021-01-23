'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const View = use('View')
const Env = use('Env')

View.global('APP_NAME', Env.get('APP_NAME'))
View.global('APP_INITIAL_NAME', Env.get('APP_INITIAL_NAME'))

Route.on('/').render('welcome')
Route.get('/search', 'HomeController.search').as('home.search')
Route.get('/join/:roomCode', 'HomeController.join').as('home.join')
Route.get('/datatable', 'HomeController.datatable').as('home.datatable')

Route.group(() => {
  Route.get('/login', 'cms/LoginController.login').as('login.page')
  Route.post('/login', 'cms/LoginController.authenticate').as('login.auth').validator('AuthRequest')
}).middleware('redirectIfAuth').middleware('csrfTokenProtection')

Route.group(() => {
  Route.get('/dashboard', 'cms/DashboardController.index').as('dashboard')
  Route.get('/dashboard/datatable', 'cms/DashboardController.datatable').as('dashboard.datatable')
  Route.post('/dashboard/schedule-meeting', 'cms/DashboardController.storeSchedule').as('dashboard.schedule')
  Route.post('/dashboard/instant-meeting', 'cms/DashboardController.instantMeeting').as('dashboard.instant-meeting')
  Route.get('/logout', 'cms/LoginController.destroySession').as('auth.destroySession')
}).middleware('customAuth').middleware('csrfTokenProtection')