import { UserModel } from "../user-model/user-model";

export class SchoolModel {
    id?:string;
    name:string;
    acronym:string;
    nif:string;
    code?:string;
    country?:string;
    adress?:string;
    phoneNumber?:number;
    email:string;   
    userId?:string;
    user?:UserModel;
}