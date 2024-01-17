import {Test, TestingModule} from '@nestjs/testing';
import {MusicCatalogService} from './music-catalog.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Music} from "../../../common/database/entities/music.entity";
import {MusicDto} from "../../../common/models/music.dto";
import fn = jest.fn;
import {filter} from "rxjs";

describe('MusicCatalogService', () => {
  let service: MusicCatalogService;

  const music = [
    {
      id: 1,
      name: "name1",
      fileName: 'filename1.mp3',
      author: 'author1',
      genre: 'Rock'
    },
    {
      id: 2,
      name: "name2",
      fileName: 'filename2.mp3',
      author: 'author2',
      genre: 'Rock'
    },
    {
      id: 3,
      name: "name3",
      fileName: 'filename3.mp3',
      author: 'author3',
      genre: 'Pop'
    }
  ]

  const musicRepository = {

    find: jest.fn().mockImplementation(async () => Promise.resolve(music)),


    save: jest.fn().mockImplementation((file) => {
      music.push({
        id: music.length + 1,
        name: file.filename,
        author: 'author',
        fileName: file.filename,
        genre: 'Folk'
      })
    }),

    createQueryBuilder: jest.fn().mockImplementation(() => ({

      select: jest.fn().mockReturnThis(),

      where: jest.fn().mockReturnThis(),

      getMany: jest.fn().mockImplementation(() => music.filter(value => {

        return value.genre === musicRepository.setGenre('Rock')

      }))
    })),

    setGenre: (genre: string) => {

      return genre;
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicCatalogService, {
        provide: getRepositoryToken(Music),
        useValue: musicRepository
      }],
    }).compile();

    service = module.get<MusicCatalogService>(MusicCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add new files', () => {
    const musicToAdd: MusicDto = {
      fileName: 'filename.png',
      author: 'someAuthor',
      name: 'someMusic',
      genre: 'Folk'
    }
    service.addNewMusic(musicToAdd, 'newMusic')
    expect(music.length).toEqual(4);
  })

  it('should return all music', async () => {
    const result = await service.getAllMusic();
    expect(result).toEqual(music);
    expect(result.length).toEqual(4);
  })

  it('should return filtered music by genre', async () => {
    const result = await service.getFilteredMusicByGenre('Rock')
    expect(result.length).toEqual(2)
  })
});
