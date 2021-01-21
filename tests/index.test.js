const {ea} = require('../dist')

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

test('check props', async () => {
  console.log(`loggedin = ${ea.store.loggedin}`)
  console.log(`access_token = ${ea.store.tokens.access_token}`)
  console.log(`refresh_token = ${ea.store.tokens.refresh_token}`)
  console.log(`user = ${JSON.stringify(ea.store.user)}`)
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

test('check props', async () => {
  console.log(`loggedin = ${ea.store.loggedin}`)
  console.log(`access_token = ${ea.store.tokens.access_token}`)
  console.log(`refresh_token = ${ea.store.tokens.refresh_token}`)
  console.log(`user = ${JSON.stringify(ea.store.user)}`)
})

test('refresh method', async() => {
  await ea.actions.refresh().catch((e) => console.log(e))
})


test('getuser method', async() => {
  await ea.actions.getuser().catch((e) => console.log(e))
})
