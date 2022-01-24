import assert from "assert";

export class CourseQuery {

    constructor(name?: string, id?:string) {            
        this.name = name ?? '';
        this.id = id ?? '';
    }
    name?: string;
    id?:string;
}