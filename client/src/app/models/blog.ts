export class Blog {
    user_id : number ;
    title : string;
    content : string;

    constructor(user_id : number , title : string, content : string) {
            this.user_id = user_id;
            this.title = title;
            this.content = content;
    }
}
