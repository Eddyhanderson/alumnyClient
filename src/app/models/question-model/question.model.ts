import { LessonModel } from "../lesson-model/lesson.model";
import { PostModel } from "../post-model/post.model";
import { StudantModel } from "../studant-model/studant.model";

export class QuestionModel {
    postId?: string;

    content: string;

    subject: string;

    id?: string;

    lessonId?: string;

    teacherPlaceId?: string;

    teacherPlaceName?: string;

    teacherPlaceBackgroundPath?:string;

    studantId: string;

    situation?: string;

    lessonBackgroundPhotoPath?: string;

    lessonSequence?: string;

    lessonTitle?: string;

    lessonType?: string;

    lessonTopicId?:string;

    commentableId?: string;

    studantFirstName?: string;

    studantLastName?: string;

    studantPhoto?: string;

    createAt?: Date;

    studantAnswerQnt?: number;

    teacherAnswerQnt?: number;

    commentsQnt?: number;
}