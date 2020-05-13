export class flaggedComment {
    commentID: number;
    userID: number;
    flagComment: number;

    public constructor(
        commentID: number,
        userID: number,
        flagComment: number
    ){
        this.commentID = commentID,
        this.userID = userID,
        this.flagComment = flagComment
    }
}