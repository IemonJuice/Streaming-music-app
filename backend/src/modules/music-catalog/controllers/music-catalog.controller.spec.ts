import {Test, TestingModule} from '@nestjs/testing';
import {MusicCatalogController} from './music-catalog.controller';
import {MusicCatalogService} from '../services/music-catalog.service';
import {MusicDto} from "../../../common/models/music.dto";
import {Music} from "../../../common/database/entities/music.entity";


describe('MusicCatalogController', () => {
  let controller: MusicCatalogController;

  const music: MusicDto[] = [
    {
      id: 1,
      name: "name1",
      fileName: 'filename1.mp3',
      author: 'author1'
    },
    {
      id: 2,
      name: "name2",
      fileName: 'filename2.mp3',
      author: 'author2'
    },
    {
      id: 3,
      name: "name3",
      fileName: 'filename3.mp3',
      author: 'author3'
    }
  ]

  const mockCatalogMusicService = {
    addNewMusic: jest.fn().mockImplementation((musicDto: MusicDto, filename: string) => {
      const newMusic: MusicDto = {
        author: musicDto.author,
        fileName: filename,
        name: musicDto.name,
        id: music.length + 1
      }
      music.push(newMusic)
      return newMusic;

    }),
    getAllMusic: jest.fn().mockImplementation(() => music),

    saveMusic: jest.fn().mockImplementation((file: any) => file)
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicCatalogController],
      providers: [MusicCatalogService],
    })
      .overrideProvider(MusicCatalogService)
      .useValue(mockCatalogMusicService)
      .compile();

    controller = module.get<MusicCatalogController>(MusicCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all music', () => {
    expect(controller.getAllMusicCatalog()).toEqual(music);
  })

  it('should save music', async () => {
    const mockFile = {filename: 'test.mp3', originalname: 'test.mp3'} as Express.Multer.File;
    const mockMusicDto = {author: 'test', fileName: 'test', name: 'test'} as MusicDto;
    const result = await controller.uploadFile(mockFile, mockMusicDto);
    expect(result.name).toEqual('test')
  });


});
