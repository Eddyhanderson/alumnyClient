import assert from "assert";

export class TeacherQuery {

    constructor(id?:string, userId?: string) {
        
        this.userId = userId ?? '';
        this.id = id ?? '';
    }
    userId?: string;
    id?:string;
}