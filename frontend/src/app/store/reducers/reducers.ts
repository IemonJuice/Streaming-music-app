import {createReducer, on} from "@ngrx/store";
import {changeCurrentPlayingMusic} from "../actions/actions";

export interface CurrentMusic {
  id: number;
  name: string;
  imageUrl: string;
  author: string;
}

const initialPlayingMusic: CurrentMusic = {author: "", id: 0, imageUrl: "", name: ""}

export const currentPlayingMusicReducer = createReducer(initialPlayingMusic,
  on(changeCurrentPlayingMusic,
    (state, {music}) => {
      return {
        id:music.id,
        imageUrl:music.imageUrl,
        author:music.author,
        name:music.name
      }
    }))
