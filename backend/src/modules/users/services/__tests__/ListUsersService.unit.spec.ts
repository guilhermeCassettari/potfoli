import 'reflect-metadata';
import { IUser } from '../../interface/IUser';
import { IUsersRepository } from '../../interface/IUsersRepository';
import ListUsersService from '../ListUsersService';

describe('ListUsersService', () => {
  let listUsersService: ListUsersService;
  let usersRepository: jest.Mocked<IUsersRepository>;

  const userData: IUser = {
    name: 'Jacinto Bug',
    email: 'test@email.com',
    password: 'hashed-password',
    phone: '1234567890',
    id: 'generated-uuid',
  };

  const mockDate = new Date('2024-08-28T17:55:43.141Z');

  beforeEach(() => {
    usersRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<IUsersRepository>;

    listUsersService = new ListUsersService(usersRepository);

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => mockDate.getTime());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to list all users', async () => {
    usersRepository.findAll.mockResolvedValue([
      {
        ...userData,
        id: 'generated-uuid',
        created_at: mockDate,
        updated_at: mockDate,
        password: 'hashed-password',
      },
    ]);

    const users = await listUsersService.execute();

    expect(users).toEqual([
      {
        ...userData,
        id: 'generated-uuid',
        created_at: mockDate,
        updated_at: mockDate,
        password: 'hashed-password',
      },
    ]);
  });

  it('should be able to list empty array', async () => {
    usersRepository.findAll.mockResolvedValue([]);

    const users = await listUsersService.execute();

    expect(users).toEqual([]);
  });
});
