export class TopicQuery {
    constructor(teacherPlaceId?:string, teacherId?:string, school?:string){
        this.teacherPlaceId = teacherPlaceId ?? '';
        this.teacherId = teacherId ?? '';
        this.school = school ?? '';
    }
    public teacherPlaceId?: string;
    public teacherId?: string;
    public school?: string;
}