const {ea} = require('../lib/commonjs')

test('configure', () => {
  ea.configure({
    app_uname: 'Test-e56e4bef'
  })
})

test('emailpass signup', async () => {
  await ea.emailpass.signup({
    email: 'testuser@piebits.org',
    password: '@TRIPLEc121'
  })
})

test('logout method', async() => {
  await ea.actions.logout().catch((e) => console.log(e))
})

test('emailpass signin', async () => {
  await ea.emailpass.signin({
    email: 'testuser@piebits.org',
    password: '@TRIPLEc121'
  })
})

test('refresh method', async() => {
  await ea.actions.refresh().catch((e) => console.log(e))
})


test('getuser method', async() => {
  await ea.actions.getuser().catch((e) => console.log(e))
})
