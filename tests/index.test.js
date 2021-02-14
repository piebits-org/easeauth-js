const {ea} = require('../lib/commonjs')

test('configure', () => {
  ea.configure({
    app_uname: 'test-36c6ba14'
  })
})

test('emailpass signup', async () => {
  try {
    await ea.emailpass.signup({
      email: 'testuser@piebits.org',
      password: 'testuser123456',
      providerData: {
        name: 'testuser',
        given_name: 'test',
        family_name: 'user',
        nickname: 'testuser',
        preferred_username: 'testuser',
        birthdate: '2000-12-12',
        gender: 'other'
      },
      customData: {
        username: 'testuser'
      }
    })
  } catch (e) {
    console.log(e.response)
  }
})

test('logout method', async() => {
  await ea.actions.logout().catch((e) => console.log(e))
})

test('emailpass signin', async () => {
  await ea.emailpass.signin({
    email: 'testuser@piebits.org',
    password: 'testuser123456'
  })
})

test('refresh method', async() => {
  await ea.actions.refresh().catch((e) => console.log(e))
})


test('getuser method', async() => {
  await ea.actions.getuser().catch((e) => console.log(e))
})
