import { UserModel } from "../user-model/user-model";

export class PostModel {

    id: string;

    userId: string;

    userPictureProfilePath: string;

    userFirstName: string;

    userLastName: string;

    postType: string;

    commentableId: string;

    createAt: Date;

    situation: string;

    user: UserModel;
}