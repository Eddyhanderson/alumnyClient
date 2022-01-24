export class TeacherPlaceModel {

    constructor(teacherId: string, schoolId: string, courseId: string, disciplineId: string, name: string, description: string) {
        this.teacherId = teacherId;
        this.schoolId = schoolId;
        this.courseId = courseId;
        this.disciplineId = disciplineId;
        this.name = name;
        this.description = description;
    }

    id?: string;

    teacherId?: string;

    createAt?: Date;

    price?: number;

    teacherFirstName?: string;

    teacherLastName?: string;

    description?: string;

    teacherPictureProfilePath?: string;

    disciplineId?: string;

    disciplineName?: string;

    courseId?: string;

    courseName?: string;

    schoolId?: string;

    schoolName?: string;

    schoolShortName?: string;

    schoolPictureProfilePath?: string;

    situation?: string;

    teacherPlaceCode?: string;

    name: string;

    profilePhotoPath?: string;

    opened?: boolean;

    answerCount?: number;

    studantsCount?: number;

    lessonsCount?: number;

    topicCount?: number;

    questionsCount?: number;

    studantAnswerCount?: number;

    teacherAnswerCount?: number;

    solvedQuestionCount?: number;
}