import 'reflect-metadata';
import CreateUserService from '../CreateUserService';

import { IUser } from '../../interface/IUser';
import regexPassword from '../../../../shared/regexPassword/regexPassword';
import phoneValidate from '../../shared/PhoneValidate';
import { uuid } from '../../../../shared/uuid/uuid';
import { hashPassword } from '../../../../shared/brypt/bcrypt';
import AppError from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../interface/IUsersRepository';

jest.mock('../../../../shared/regexPassword/regexPassword');
jest.mock('../../shared/PhoneValidate');
jest.mock('../../../../shared/uuid/uuid');
jest.mock('../../../../shared/brypt/bcrypt');

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let usersRepository: jest.Mocked<IUsersRepository>;

  beforeEach(() => {
    usersRepository = {
      create: jest.fn(),
      findUniqueUser: jest.fn(),
    } as unknown as jest.Mocked<IUsersRepository>;

    createUserService = new CreateUserService(usersRepository);

    (regexPassword as jest.Mock).mockImplementation(() => true);
    (phoneValidate as jest.Mock).mockImplementation(
      () => '1234567890',
    );
    (uuid as jest.Mock).mockImplementation(() => 'generated-uuid');
    (hashPassword as jest.Mock).mockImplementation(
      () => 'hashed-password',
    );
  });

  it('should be able to create a new user', async () => {
    const userData: IUser = {
      name: 'Jacinto Bug',
      email: 'wLHq5@example.com',
      password: '_Testee12345',
      phone: '1234567890',
    };

    usersRepository.findUniqueUser.mockResolvedValue(null);
    usersRepository.create.mockResolvedValue({
      ...userData,
      id: 'generated-uuid',
      password: 'hashed-password',
    });

    const user = await createUserService.execute(userData);

    expect(usersRepository.findUniqueUser).toHaveBeenCalledWith({
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
    });

    expect(usersRepository.create).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password: 'hashed-password',
      phone: '1234567890',
      id: 'generated-uuid',
    });

    expect(user).toEqual({
      name: userData.name,
      email: userData.email,
      password: 'hashed-password',
      phone: '1234567890',
      id: 'generated-uuid',
    });
  });

  it('should not be able to create a new user with an existing email', async () => {
    const userData: IUser = {
      name: 'Jacinto Bugs',
      email: 'wLHq5@example.com',
      password: '_Testee12345',
      phone: '1234567891',
    };

    usersRepository.findUniqueUser.mockResolvedValue({
      name: 'Jacinto Bug',
      email: userData.email,
      phone: '1234556789',
      id: 'generated-uuid',
      password: 'hashed-password',
    });

    await expect(
      createUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an existing phone', async () => {
    const userData: IUser = {
      name: 'Jacinto Bug',
      email: 'wLHq5@example.com',
      password: '_Testee12345',
      phone: '1234567890',
    };

    usersRepository.findUniqueUser.mockResolvedValue({
      name: 'Jacinto Bugs',
      email: 'wLaHq5@example.com',
      phone: userData.phone,
      id: 'generated-uuid',
      password: 'hashed-password',
    });

    await expect(
      createUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an existing name', async () => {
    const userData: IUser = {
      name: 'Jacinto Bug',
      email: 'wLHq5@example.com',
      password: '_Testee12345',
      phone: '1234567890',
    };

    usersRepository.findUniqueUser.mockResolvedValue({
      name: userData.name,
      email: 'wLaHq5@example.com',
      phone: '1234556789',
      id: 'generated-uuid',
      password: 'hashed-password',
    });

    await expect(
      createUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to create a user whitout name', async () => {
    const userData: IUser = {
      name: '',
      email: 'wLHq5@example.com',
      password: '_Testee12345',
      phone: '1234567890',
    };

    await expect(
      createUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to create a user whitout email', async () => {
    const userData: IUser = {
      name: 'Jacinto Bug',
      email: '',
      password: '_Testee12345',
      phone: '1234567890',
    };

    await expect(
      createUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to create a user whitout password', async () => {
    const userData: IUser = {
      name: 'Jacinto Bug',
      email: 'wLHq5@example.com',
      password: '',
      phone: '1234567890',
    };

    await expect(
      createUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to create a user whitout phone', async () => {
    const userData: IUser = {
      name: 'Jacinto Bug',
      email: 'wLHq5@example.com',
      password: '_Testee12345',
      phone: '',
    };

    await expect(
      createUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
