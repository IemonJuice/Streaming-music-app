import {Test, TestingModule} from '@nestjs/testing';
import {RegisterService} from './register.service';
import {User} from "../../../../common/database/entities/user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {AuthService} from "../auth.service";
import {BadRequestException} from "@nestjs/common";


describe('RegisterService', () => {
  let service: RegisterService;

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
    findOneBy: jest.fn().mockImplementation(({id: id}) => mockDB.find((value) => value.id === id)),
    save: jest.fn().mockImplementation((user: User) => {
      mockDB.push(user)
      return user;
    })
  }
  const mockAuthService = {
    getTokenForUser: jest.fn().mockImplementation((newUser) => newUser)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterService, AuthService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository
      }],
    }).overrideProvider(AuthService).useValue(mockAuthService).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should push new user to the database', async () => {
    await service.registerUser({
      username: 'username2',
      email: 'email2@gmail.com',
      password: '12345678902',
      tel: '8457457474582842',
      dateOfRegistration: new Date(),
      dateOfBirth: new Date(),
      gender: 'male2',
      lastname: 'mocklasyname2',
      firstname: 'mockfirstname2',
    })
    expect(mockDB.length).toEqual(4)
  })

  it('should throw error of existed user', async () => {
    await expect(async () =>
      await service.registerUser({
        username: 'username2',
        email: 'email2@gmail.com',
        password: '12345678902',
        tel: '8457457474582842',
        dateOfRegistration: new Date(),
        dateOfBirth: new Date(),
        gender: 'male2',
        lastname: 'mocklasyname2',
        firstname: 'mockfirstname2',
      })).rejects.toThrow(BadRequestException);
  })
});
