/* tslint:disable */
import { CommentDto } from './comment-dto';
import { UserDto } from './user-dto';
export interface PostDto {
  id?: string;
  poster?: UserDto;
  title?: string;
  datePost?: string;
  description?: string;
  photo?: string;
  video?: string;
  tags?: string;
  comments?: Array<CommentDto>;
  postLikers: Array<String>;
}
