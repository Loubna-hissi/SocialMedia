import { UserDto } from "./user-dto";

/* tslint:disable */
export interface CommentDto {
    id:string;
    commenter:UserDto;
    contenu:string;
    idPost:string;
    dateComment:Date;
}
