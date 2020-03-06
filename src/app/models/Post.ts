export class Post {
    postId: number;
    userId: number;
    userName: String;
    postHeader: String;
    postContent: String;
    postDate: String;
    media: String;
    active: number;

    public constructor(
        postId: number,
        userId: number,
        userName: String,
        postHeader: String,
        postContent: String,
        postDate: String,
        media: String,
        active: number
    ) {
        this.postId = postId,
            this.userId = userId,
            this.userName = userName,
            this.postHeader = postHeader,
            this.postContent = postContent,
            this.postDate = postDate,
            this.media = media,
            this.active = active
    }



}