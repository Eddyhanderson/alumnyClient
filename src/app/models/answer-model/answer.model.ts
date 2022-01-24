import { CommentModel } from "../comment-model/comment.model";

export class AnswerModel {

    public id?: string;

    public questionId: string;

    public postId?: string;

    public commentableId?:string;

    public content: string;

    public userFirstName?: string;

    public userLastName?: string;

    public userPhoto?: string;

    public createAt?: Date;

    public userCourse?: string;

    public userAcademy?: string;

    public userAcademicLevel?: string;

    public userRole?: string;

    public comments?: CommentModel[];
}






