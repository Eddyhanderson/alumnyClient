import assert from "assert";


export class AcademyQuery{
    constructor(name?: string, id?:string) {        
        this.name = name ?? '';
        this.id = id ?? '';
    }
    name?: string;
    id?:string;
}