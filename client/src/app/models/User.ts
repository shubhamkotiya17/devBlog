export class User {
   private id?:number;
   private firstName:string;
   private lastName:string;
   private gender:string;
   private email:string;
   public token?:string;
   private password: string;

    constructor(firstName:string, lastName:string,gender:string,email:string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }
}