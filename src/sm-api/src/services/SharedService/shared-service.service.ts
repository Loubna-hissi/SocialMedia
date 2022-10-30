import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserDto } from '../../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  send_data = new BehaviorSubject<UserDto>(new UserDto());
  constructor() { }
}
