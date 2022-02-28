export class FormationQuery {
    constructor(schoolId?: string, studantId?: string) {
        this.schoolId = schoolId ?? '';
        this.studantId = studantId ?? '';
    }
    public schoolId?: string;
    public studantId?: string;
}
