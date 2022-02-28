export class FormationRequestQuery {
    constructor(studantId?: string, isResponsable?: boolean, isManager?: boolean, isSchool?:boolean) {
        this.isResponsable = isResponsable ? 'true' : 'false'
        this.isManager = isManager ? 'true' : 'false';
        this.isSchool = isSchool ? 'true' : 'false';
        this.studantId = studantId;
    }
    public isResponsable?: string;
    public isManager?: string;
    public isSchool?: string;
    public studantId?: string;
}