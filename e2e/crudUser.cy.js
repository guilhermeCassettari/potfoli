
const initialUser = {
  name: 'Cy Testando 322',
  email: 'cytestandoaaa@example.com',
  password: '_Cytest123456',
  phone: '1499811561',
}
describe('Crud User', () => {
  const baseUrl = 'http://localhost:3002'
  let createdUserId
  let userId

  beforeEach(() => {
    cy.request('POST', `${baseUrl}/users`, {
      name: 'test befode',
      email: 'testbefore@gmail.com',
      password: '_Testebefode11',
      phone: '14 998551150',

    }).then((response) => {
      createdUserId = response.body.id
    })
  })

  afterEach(() => {
    cy.request('DELETE', `${baseUrl}/users`, {
      id: createdUserId
    })
  })

  it('should be able to create a new user', () => {
    cy.request('POST', `${baseUrl}/users`, initialUser).then((response) => {
      expect(response.status).to.eq(200)
      userId = response.body.id;
    })
  })


  it('should be able to update a user', () => {
    cy.request('PATCH', `${baseUrl}/users`, {
      id: userId,
      name: 'Cy Testando update',
      email: 'update@example.com',
      password: '_Cytest123456',
      phone: '1499711561',
    }).then((response) => {
      expect(response.status).to.eq(200)
    })



    cy.request('GET', `${baseUrl}/users`).then((response) => {
      const updatedUser = response.body.find((user) => user.id === userId)

      expect(updatedUser.name).to.eq('Cy Testando update')
    })
  })

  it('should not be able to create a new user with same email', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: 'Cy Testando 322',
        email: 'update@example.com',
        password: '_Cytest123456',
        phone: '1499811561',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('should not be able to create a new user without informations', () => {

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: '',
        email: '',
        password: '',
        phone: '',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('should be not able to create a new user with an existing phone', () => {

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: 'Cy Testando 322',
        email: 'update@example.com',
        password: '_Cytest123456',
        phone: '1499811561',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('should be no allowed to create a new user whit week password', () => {

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: 'Cy Testando 322',
        email: 'update@example.com',
        password: '123',
        phone: '1499811561',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: 'Cy Testando 322',
        email: 'update@example.com',
        password: 'aaa',
        phone: '1499811561',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: 'Cy Testando 322',
        email: 'update@example.com',
        password: 'CCC',
        phone: '1499811561',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })
  it('should be able to delete a user', () => {

    cy.request('DELETE', `${baseUrl}/users`, {
      id: userId
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

