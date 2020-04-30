export class rating {
    postID: number;
    userID: number;
    selectedRating: number;

    public constructor(
        postID: number,
        userID: number,
        selectedRating: number
    ){
        this.postID = postID,
        this.userID = userID,
        this.selectedRating = selectedRating
    }
}