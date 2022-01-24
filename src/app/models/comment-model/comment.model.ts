export class CommentModel {
    public id?: string;

    public comentableId?: string;

    public content?: string;

    public postId?: string;

    public userFirstName?: string;

    public userLastName?: string;

    public userPhoto?:string;

    public createAt?: Date;
}