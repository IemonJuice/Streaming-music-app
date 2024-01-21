export interface RegisterResponse {
  user: {
    dateOfRegistration:string;
    email:string;
    firstName:string;
    username:string;
    id:number;
  },
  token:string
}
