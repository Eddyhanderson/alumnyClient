export class FormationRequestModel {
    id?:string;
    formationId: string;
    studantId: string;
    studantMessage?: string;
    teacherMessage?: string;
    state?: string;
    createAt?:Date;
    stateDate?:Date;
    formationTheme?:string;
    formationSchoolPicture?:string;
    formationSchoolAcronym?:string;
    formationSchoolName?:string;
    formationPrice?:number;
    formationStart?:Date;
    studantFisrtName?:string;
    studantLastName?:string;
    studantPicture?:string;
    studantOrganId?:string;
    studantOrganName?:string;
    studantOrganBadget?:string;
}
