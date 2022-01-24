export class DisciplineTopicQuery {  
    public constructor(teacherPlaceId?:string, teacherId?:string, schoolId?:string){
        this.teacherPlaceId = teacherPlaceId ?? '';
        this.teacherId = teacherId ?? '';
        this.schoolId = schoolId ?? ''
    }  
    teacherPlaceId?: string;
    teacherId?: string;
    schoolId?:string;
}