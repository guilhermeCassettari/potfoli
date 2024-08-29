import 'reflect-metadata';

import { IUsersRepository } from '../../interface/IUsersRepository';
import { IUser } from '../../interface/IUser';
import regexPassword from '../../../../shared/regexPassword/regexPassword';
import phoneValidate from '../../shared/PhoneValidate';
import { hashPassword } from '../../../../shared/brypt/bcrypt';
import AppError from '../../../../shared/errors/AppError';
import UpdateUserService from '../UpdateUserService';

jest.mock('../../../../shared/regexPassword/regexPassword');
jest.mock('../../shared/PhoneValidate');
jest.mock('../../../../shared/uuid/uuid');
jest.mock('../../../../shared/brypt/bcrypt');

describe('UpdateUserService', () => {
  let updateUserService: UpdateUserService;
  let usersRepository: jest.Mocked<IUsersRepository>;

  const userData: IUser = {
    name: 'Jacinto Bug',
    email: 'wLHq5@example.com',
    password: 'hashed-password',
    phone: '1234567890',
    id: 'generated-uuid',
  };

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
      findUniqueUser: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<IUsersRepository>;

    updateUserService = new UpdateUserService(usersRepository);

    (regexPassword as jest.Mock).mockImplementation(() => true);
    (phoneValidate as jest.Mock).mockImplementation(
      () => '1234567890',
    );

    (hashPassword as jest.Mock).mockImplementation(
      () => 'hashed-password',
    );

    usersRepository.findById.mockResolvedValue(userData);
    usersRepository.findUniqueUser.mockResolvedValue(null);
    usersRepository.update.mockResolvedValue();
    usersRepository.findById.mockResolvedValueOnce({
      ...userData,
    });
  });

  it('not should be able to update a user if no have id by find by id', async () => {
    usersRepository.findById.mockResolvedValueOnce(null);

    await expect(
      updateUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);

    usersRepository.findById.mockResolvedValueOnce(null);
    await expect(
      updateUserService.execute({
        name: 'Jacinto Bugs',
        email: 'wLHsq5@example.com',
        password: 'haashed-password',
        phone: '1237567890',
        id: 'gerated-uuid',
      }),
    ).rejects.toThrow('User not found.');
  });

  it('should not be able update a user with another existing email', async () => {
    const existingUser: IUser = {
      id: 'different-user-id',
      name: 'Jacinto Bug',
      email: 'test@example.com',
      password: 'OtherPassword123!',
      phone: '1234567890',
    };

    usersRepository.findById.mockResolvedValue(userData);
    usersRepository.findUniqueUser.mockResolvedValue(existingUser);

    await expect(
      updateUserService.execute({
        ...userData,
        name: 'Jacinto Bug Updated',
        email: 'test@example.com',
        id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateUserService.execute({
        ...userData,
        name: 'Jacinto Bug Updated',
        email: 'test@example.com',
        id: '2',
      }),
    ).rejects.toThrow('User already exists.');
  });

  it('should not be able to create a new user without informations', async () => {
    await expect(
      updateUserService.execute({} as IUser),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should to be able to create a user with valid informations', async () => {
    await expect(
      updateUserService.execute({
        ...userData,
        name: 'Jacinto Bug Updated',
        email: 'test@example.com',
      }),
    ).resolves.toEqual(userData);
  });
});
