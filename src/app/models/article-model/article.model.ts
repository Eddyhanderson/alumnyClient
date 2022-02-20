export class ArticleModel {
    constructor(delta: string, moduleId: string, id?:string, name?:string, lastChange?:Date,situation?:string) {
        this.id = id;
        this.delta = delta;
        this.moduleId = moduleId;
        this.draft = true;
        this.name = name;
        this.lastChange = lastChange;
        this.situation = situation;
    }
    
    id: string;

    name:string;

    delta: string;

    moduleId: string;

    situation: string;

    draft: boolean;

    lastChange: Date;
}