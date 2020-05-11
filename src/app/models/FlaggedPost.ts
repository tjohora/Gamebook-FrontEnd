export class flaggedPost {
    postID: number;
    userID: number;
    flagPost: number;

    public constructor(
        postID: number,
        userID: number,
        flagPost: number
    ){
        this.postID = postID,
        this.userID = userID,
        this.flagPost = flagPost
    }
}