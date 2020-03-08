export class Comment {
    commentID: number;
    userId:number;
    commentDate: number;
    content: string;
    postId: string;
    userName: string;
    active: number;

    public constructor(
        commentID: number,
        userId: number,
        commentDate: number,
        content: string,
        postId: string,
        userName: string,
        active: number
    ) {
        this.postId = postId,
            this.commentID = commentID,
            this.userId = userId
            this.commentDate = commentDate,
            this.content = content,
            this.postId = postId,
            this.userName = userName,
            this.active = active
    }
}