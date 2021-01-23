const Route = use('Route')

Route.group(() => {
  Route.post('/login', 'api/AuthController.authentication').validator('AuthRequest')
  Route.post('/refreshToken', 'api/AuthController.refreshToken').validator('TokenKeyValidation')
}).prefix('/api/v1')

Route.group(() => {
  Route.get('/check-profile', 'api/ProfileController.getProfile')
  Route.post('/logout', 'api/AuthController.destroyToken').validator('TokenKeyValidation')
}).prefix('/api/v1/').middleware('generalApiAuth')