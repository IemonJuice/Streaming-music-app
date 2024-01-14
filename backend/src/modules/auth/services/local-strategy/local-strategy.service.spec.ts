import {Test, TestingModule} from '@nestjs/testing';
import {LocalStrategyService} from './local-strategy.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "../../../../common/database/entities/user.entity";
import {BadRequestException} from "@nestjs/common";

describe('LocalStrategyService', () => {
  let service: LocalStrategyService;

  const mockDB: User[] = [
    {
      id: 1,
      username: 'username1',
      email: 'email1@gmail.com',
      password: '1234567890',
      tel: '845745747458284',
      dateOfRegistration: new Date(),
      dateOfBirth: new Date(),
      gender: 'male',
      lastname: 'mocklasyname',
      firstname: 'mockfirstname',
      loadedMusic: []
    },
    {
      id: 2,
      username: 'username2',
      email: 'email2@gmail.com',
      password: '12345678902',
      tel: '8457457474582842',
      dateOfRegistration: new Date(),
      dateOfBirth: new Date(),
      gender: 'male2',
      lastname: 'mocklasyname2',
      firstname: 'mockfirstname2',
      loadedMusic: []
    },
    {
      id: 3,
      username: 'username3',
      email: 'email3@gmail.com',
      password: '12345678902',
      tel: '8457457474582842',
      dateOfRegistration: new Date(),
      dateOfBirth: new Date(),
      gender: 'male3',
      lastname: 'mocklasyname3',
      firstname: 'mockfirstname3',
      loadedMusic: []
    },
  ];

  const mockUserRepository = {
    findOneBy: jest.fn().mockImplementation(({id: id}) => mockDB.find((value) => value.id === id))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategyService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository
      }],
    }).compile();
    service = module.get<LocalStrategyService>(LocalStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw exception with unknown user', async () => {
    await expect(async () =>
      await service.validate('username323', 'test123')).rejects.toThrow(BadRequestException);
  })

  it('should throw exception with wrong password', async () => {
    await expect(async () =>
      await service.validate('username2', 'test123')).rejects.toThrow(BadRequestException);
  })
})
