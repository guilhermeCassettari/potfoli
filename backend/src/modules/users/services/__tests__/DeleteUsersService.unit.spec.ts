import 'reflect-metadata';
import { IUser } from '../../interface/IUser';
import { IUsersRepository } from '../../interface/IUsersRepository';
import DeleteUserService from '../DeleteUserService';
import AppError from '../../../../shared/errors/AppError';

describe('DeleteUserService', () => {
  let deleteUserService: DeleteUserService;
  let usersRepository: jest.Mocked<IUsersRepository>;

  const userData: IUser = {
    name: 'Jacinto Bug',
    email: 'test@email.com',
    password: 'hashed-password',
    phone: '1234567890',
    id: 'generated-uuid',
  };

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
      deleteTestUser: jest.fn(),
    } as unknown as jest.Mocked<IUsersRepository>;

    deleteUserService = new DeleteUserService(usersRepository);

    usersRepository.findById.mockResolvedValue(userData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('not to be able to execute without id', async () => {
    await expect(
      deleteUserService.execute({}),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not to be able to execute with invalid id', async () => {
    usersRepository.findById.mockResolvedValueOnce(null);
    await expect(
      deleteUserService.execute({ id: 'invalid-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a user', async () => {
    usersRepository.findById.mockResolvedValueOnce({
      ...userData,
    });
    usersRepository.delete.mockResolvedValueOnce();
    await expect(
      deleteUserService.execute({ id: userData.id }),
    ).resolves.not.toThrow();
  });

  it('should be able to delete a user test', async () => {
    usersRepository.deleteTestUser.mockResolvedValueOnce();
    await expect(
      deleteUserService.deleteTest(),
    ).resolves.not.toThrow();
  });
});
