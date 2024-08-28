import { AppDataSource } from '../../../../shared/data-source';
import UsersRepository from '../UsersRepository';
describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password',
    phone: '1234567890',
    id: '1',
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
    const createdUser = await usersRepository.create({
      name: 'John Does',
      email: 'john.dose@example.com',
      password: 'passaword',
      phone: '1234467890',
      id: '2',
    });

    expect(createdUser.name).toEqual('John Does');
    expect(createdUser.email).toEqual('john.dose@example.com');
    expect(createdUser.password).toEqual('passaword');
    expect(createdUser.id).toEqual('2');
  });

  it('should be able to update a user', async () => {
    const updatedUser = await usersRepository.update({
      ...user,
      name: 'Jacinto Bug',
    });

    expect(updatedUser).toBeUndefined();

    const updatedUserFromDB = await usersRepository.findById('1');

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

    const userNotFound = await usersRepository.findById('321');

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
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    });

    expect(foundUser).toHaveProperty('name', 'John Doe');

    const userNotFound = await usersRepository.findUniqueUser({
      name: 'Jacinto Bug Aqui',
      email: 'jacintoBugAqui@example.com',
      phone: '11998745623',
    });

    expect(userNotFound).toBeNull();

    const userNameFound = await usersRepository.findUniqueUser({
      name: 'John Doe',
      email: 'jacintoBugAqui@example.com',
      phone: '11998745623',
    });

    expect(userNameFound).toHaveProperty('name', 'John Doe');

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
