import {createAction, props} from "@ngrx/store";
import {Music} from "../../core/models/music.model";
import {Profile} from "../../core/models/profile.model";

export const changeCurrentPlayingMusic = createAction('[Music] change current music', props<{music:Music}>())

export const getUserProfileAction = createAction('[Profile] get all data',props<{profile:Profile}>())
