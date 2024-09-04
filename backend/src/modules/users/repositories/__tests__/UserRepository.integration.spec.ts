import { AppDataSource } from '../../../../shared/data-source';
import { uuid } from '../../../../shared/uuid/uuid';
import UsersRepository from '../UsersRepository';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  const user = {
    name: 'Jacinto Bug',
    email: 'john.doe@example.com',
    password: 'password',
    phone: '1234567890',
    id: uuid(),
  };

  beforeEach(async () => {
    usersRepository = new UsersRepository();
    await AppDataSource.initialize();
    await usersRepository.create(user);
  });

  afterEach(async () => {
    await usersRepository.delete(user);
    await AppDataSource.destroy();
  });

  it('should be able to create a new user', async () => {
    const idUser = uuid();
    const createdUser = await usersRepository.create({
      name: 'Jacinto Bugs',
      email: 'john.dose@example.com',
      password: 'passaword',
      phone: '1234467890',
      id: idUser,
    });

    expect(createdUser.name).toEqual('Jacinto Bugs');
    expect(createdUser.email).toEqual('john.dose@example.com');
    expect(createdUser.password).toEqual('passaword');
    expect(createdUser.id).toEqual(idUser);
  });

  it('should be able to update a user', async () => {
    const updatedUser = await usersRepository.update({
      ...user,
      name: 'Jacinto Bug',
    });

    expect(updatedUser).toBeUndefined();

    const updatedUserFromDB = await usersRepository.findById(user.id);

    if (!updatedUserFromDB) {
      throw new Error('User not found');
    }

    expect(updatedUserFromDB.name).toEqual('Jacinto Bug');
  });

  it('should be able to delete a user', async () => {
    const deletedUser = await usersRepository.delete(user);

    expect(deletedUser).toBeUndefined();

    const deletedUserFromDB = await usersRepository.findById(user.id);

    expect(deletedUserFromDB).toBeNull();
  });

  it('should be able to find a user by id', async () => {
    const foundUser = await usersRepository.findById(user.id);

    expect(foundUser).toHaveProperty('id', user.id);

    const userNotFound = await usersRepository.findById(uuid());

    expect(userNotFound).toBeNull();
  });

  it('should be able to find a user by email', async () => {
    const foundUser = await usersRepository.findByEmail(user.email);

    expect(foundUser).toHaveProperty('email', user.email);

    const userNotFound = await usersRepository.findByEmail(
      'teste@testando.com',
    );

    expect(userNotFound).toBeNull();
  });

  it('should be able to find a unique user', async () => {
    const foundUser = await usersRepository.findUniqueUser({
      name: 'Jacinto Bug',
      email: 'john.doe@example.com',
      phone: '1234567890',
    });

    expect(foundUser).toHaveProperty('name', 'Jacinto Bug');

    const userNotFound = await usersRepository.findUniqueUser({
      name: 'Jacinto Bug Aqui',
      email: 'jacintoBugAqui@example.com',
      phone: '11998745623',
    });

    expect(userNotFound).toBeNull();

    const userNameFound = await usersRepository.findUniqueUser({
      name: 'Jacinto Bug',
      email: 'jacintoBugAqui@example.com',
      phone: '11998745623',
    });

    expect(userNameFound).toHaveProperty('name', 'Jacinto Bug');

    const userEmailFound = await usersRepository.findUniqueUser({
      name: 'Jacinto Bug Aqui',
      email: 'john.doe@example.com',
      phone: '11998745623',
    });

    expect(userEmailFound).toHaveProperty(
      'email',
      'john.doe@example.com',
    );

    const userPhoneFound = await usersRepository.findUniqueUser({
      name: 'Jacinto Bug Aqui',
      email: 'jacintoBugAqui@example.com',
      phone: '1234567890',
    });

    expect(userPhoneFound).toHaveProperty('phone', '1234567890');
  });

  it('should be able to find all users', async () => {
    const users = await usersRepository.findAll();
    expect(users.length).toBeGreaterThanOrEqual(1);
  });
});
