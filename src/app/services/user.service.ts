import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  me(): Observable<User> {
    return this.http.get<User>('/users/me');
  }
}
