export class ArticleModel {
    constructor(delta: string, teacherId: string, id?:string, name?:string, lastChange?:Date,situation?:string) {
        this.id = id;
        this.delta = delta;
        this.teacherId = teacherId;
        this.draft = false;
        this.name = name;
        this.lastChange = lastChange;
        this.situation = situation;
    }
    
    id: string;

    name:string;

    delta: string;

    teacherId: string;

    situation: string;

    draft: boolean;

    lastChange: Date;
}