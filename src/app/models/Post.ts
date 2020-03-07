export class Post {
    postId: number;
    userId: number;
    userName: string;
    postHeader: string;
    postContent: string;
    postDate: string;
    media: string;
    active: number;

    public constructor(
        postId: number,
        userId: number,
        userName: string,
        postHeader: string,
        postContent: string,
        postDate: string,
        media: string,
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