import {createAction, props} from "@ngrx/store";
import {Music} from "../../core/models/music.model";

export const changeCurrentPlayingMusic = createAction('[Music] change current music ', props<{music:Music}>())
