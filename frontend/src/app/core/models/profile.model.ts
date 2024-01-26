import {Music} from "./music.model";

export interface Profile{
  dateOfRegistration:string;
  email:string;
  firstName:string;
  id:number;
  username:string;
  likedMusic?:Music[]
  loadedMusic?: Music[]
}
