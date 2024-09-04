const initialUser = {
  name: '[test]Test Cy Testando 322',
  email: 'testcytestandoaaa@example.com',
  password: '_Cytest123456',
  phone: '1499811561',
};
describe('Crud User', () => {
  const baseUrl = 'http://localhost:3002';

  beforeEach(function () {
    cy.request('POST', `${baseUrl}/users/login`, {
      email: 'test@example.com',
      password: '_Secure1234567890',
    }).then(response => {
      this.token = response.body.token;

      return cy
        .request({
          method: 'POST',
          url: `${baseUrl}/users`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: {
            name: initialUser.name,
            email: initialUser.email,
            password: initialUser.password,
            phone: initialUser.phone,
          },
        })
        .then(response => {
          this.userId = response.body.id;
        });
    });
  });

  afterEach(function () {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        id: this.userId,
      },
    });
  });

  it('should be able to create a new user', function () {
    let createdUser;
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        name: '[test] Testando',
        email: 'example@example.com',
        password: '_Cytest123456',
        phone: '1499711561',
      },
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.email).to.eq('example@example.com');
      expect(response.body.phone).to.eq('1499711561');
      expect(response.body.created_at).to.not.be.null;
      expect(response.body.updated_at).to.not.be.null;
      expect(response.body.id).to.not.be.null;

      createdUser = response.body.id;

      return cy.request({
        method: 'DELETE',
        url: `${baseUrl}/users`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: {
          id: createdUser,
        },
      });
    });
  });

  it('should be able to update a user', function () {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        id: this.userId,
        name: '[test] Cy Testando update',
        email: 'update@example.com',
        password: '_Cytest123456',
        phone: '1499711561',
      },
    }).then(response => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'GET',
      url: `${baseUrl}/users`,
      headers: { Authorization: `Bearer ${this.token}` },
    }).then(response => {
      const updatedUser = response.body.find(
        user => user.id === this.userId,
      );

      expect(updatedUser.name).to.eq('[test] Cy Testando update');
    });
  });

  it('should not be able to create a new user with same email', function () {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        name: '[test]Cy Testando 322',
        email: initialUser.email,
        password: '_Cytest123456',
        phone: '1499811561',
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(400);
      expect(response.body.message.message).to.eq(
        'User already exists.',
      );
    });
  });

  it('should not be able to create a new user without informations', function () {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        name: '',
        email: '',
        password: '',
        phone: '',
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(400);
    });
  });

  it('should be not able to create a new user with an existing phone', function () {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        name: '[test]Cy Testando 322',
        email: 'update@example.com',
        password: '_Cytest123456',
        phone: initialUser.phone,
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(400);
      expect(response.body.message.message).to.eq(
        'User already exists.',
      );
    });
  });

  it('should be no allowed to create a new user whit week password', function () {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        name: '[test]Cy Testando 322',
        email: 'update@example.com',
        password: '123',
        phone: '1499811561',
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(400);
    });

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        name: '[test]Cy Testando 322',
        email: 'update@example.com',
        password: 'aaa',
        phone: '1499811561',
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(400);
    });

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        name: '[test]Cy Testando 322',
        email: 'update@example.com',
        password: 'CCC',
        phone: '1499811561',
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(400);
    });
  });

  it('should be able to delete a user', function () {
    let userTestId;
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: { Authorization: `Bearer ${this.token}` },
      body: {
        name: '[test]Cyy Testando 322',
        email: 'updaate@example.com',
        password: '_Cytest123456',
        phone: '1499811541',
      },
    }).then(response => {
      userTestId = response.body.id;

      return cy
        .request({
          method: 'DELETE',
          url: `${baseUrl}/users`,
          headers: { Authorization: `Bearer ${this.token}` },
          body: {
            id: userTestId,
          },
        })
        .then(response => {
          expect(response.status).to.eq(200);
        });
    });
  });
});
