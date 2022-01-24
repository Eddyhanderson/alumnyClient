export class TopicModel {
    public id?: string;

    public commentableId?:string;

    public createAt?:Date;

    public photoProfile?: string;

    public description: string;

    public disciplineTopicId: string;

    public teacherPlaceId: string;

    public postId?: string;

    public disciplineTopicName?: string;

    public teacherPlaceName?: string;

    public teacherPlaceProfilePhoto?:string;

    public teacherPlaceProfileDisciplineName?:string;

    public disciplineName?:string;

    public creationAt?: Date;

    public lessonCount?: number;

    public openLessonCount?:number;

    public answerCount?: number;

    public questionCount?: number;

    public solvedQuestionCount?: number;

    public commentCount?: number;
}