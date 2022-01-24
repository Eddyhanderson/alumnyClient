import { QuestionSituations } from "src/app/shared/utils/constants";

export class QuestionQuery{

    constructor(){
        this.teacherPlaceId = '';
        this.teacherId = '';
        this.lessonId = '';
        this.studantId = '';  
    }

    public teacherPlaceId?:string;

    public lessonId?:string;

    public studantId?:string;

    public teacherId?:string;

    public situation?:QuestionSituations;
}