export class CommentQuery {
    constructor(commentableId?: string) {
        this.commentableId = commentableId ?? '';
    }
    public commentableId?: string;
}