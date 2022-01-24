import assert from "assert";

export class StudantQuery {

    constructor(id?:string, userId?: string) {        
        this.userId = userId ?? '';
        this.id = id ?? '';
    }
    userId?: string;
    id?:string;
}