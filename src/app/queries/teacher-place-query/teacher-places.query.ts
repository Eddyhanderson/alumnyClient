export class TeacherPlaceQuery {
    constructor(teacherId?:string, schoolId?:string, opened?:string){
        this.opened = opened ?? '2';
        this.teacherId = teacherId ?? '';
        this.schoolId = schoolId ?? '';        
    }

    teacherId?: string;
    studantId?:string;
    schoolId?: string;   
    courseId?:string;
    opened?:string;     
}