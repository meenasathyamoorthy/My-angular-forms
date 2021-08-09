import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usermodel } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly URLupdate: string = "http://localhost:3000/update";
  private readonly URL: string = "http://localhost:3000/create";
  private readonly URLgetone: string = "http://localhost:3000/getone";
  private readonly URLfind: string = "http://localhost:3000/find";
  private readonly URLdelete: string = "http://localhost:3000/delete";

  constructor(private http: HttpClient) { }

  create(data: usermodel): Observable<usermodel> {
    return this.http.post<usermodel>(this.URL, data);

  }
  update(data: usermodel): Observable<usermodel> {
    return this.http.put<usermodel>(this.URLupdate + "/" + data._id, data);

  }
  Getall(): Observable<usermodel[]> {
    return this.http.get<usermodel[]>(this.URLfind);

  }
  getone(id: any): Observable<usermodel> {
    console.log(this.URLgetone + "/" + id);
    return this.http.get<usermodel>(this.URLgetone + "/" + id);
  }
  delete(id: any): Observable<usermodel> {
    return this.http.delete<usermodel>(this.URLdelete + '/' + id);
  }


}