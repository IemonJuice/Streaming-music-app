import {createReducer, on} from "@ngrx/store";
import {changeCurrentPlayingMusic, getUserProfileAction} from "../actions/actions";
import {Profile} from "../../core/models/profile.model";

export interface CurrentMusic {
  id: number;
  name: string;
  imageUrl: string;
  author: string;
}

const initialPlayingMusic: CurrentMusic = {author: "", id: 0, imageUrl: "", name: ""}
const initialProfile:Profile = {dateOfRegistration: "", email: "", firstName: "", id: 0, loadedMusic: [], username: ""}
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

export const profileReducer = createReducer(initialProfile,on(getUserProfileAction,(state,{profile}) => profile))
