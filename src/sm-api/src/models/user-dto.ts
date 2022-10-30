/* tslint:disable */
import { PostDto } from './post-dto';
export class UserDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  bornDate?: string;
  password?: string;
  email?: string;
  bio?: string;
  profilPhoto?: string;
  couvertPhoto?: string;
  address?: string;
  school?: string;
  job?: string;
  gender?: string;
  familyStituation?: string;
  posts?: Array<PostDto>;
  followings?: Array<String>;
  followers?: Array<String>;

  UserDto(firstName?: string,lastName?: string,bornDate?: string, password?: string,email?: string){
      this.firstName=firstName;
      this.lastName=lastName;
      this.bornDate=bornDate;
      this.password=password;
      this.email=email;
  }
}
