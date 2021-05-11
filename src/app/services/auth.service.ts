import { Injectable } from '@angular/core';
import { User } from './../models/User';
import {Router} from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';

import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {first,catchError,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn$=new BehaviorSubject<boolean>(false);
  userId: Pick<User,'uid'>;
  isauthLogger=true;

  private url='http://localhost:5000/auth/signup';
  private url1='http://localhost:5000/auth/login';

// eslint-disable-next-line @typescript-eslint/member-ordering
httpOptions: {headers: HttpHeaders}={
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


  constructor(private http: HttpClient,private errorHandlerService: ErrorHandlerService,private router: Router) { }

  signup(user): Observable<User>{
    console.log('auth');
    return this.http.post<User>(this.url,user,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>('signup'))

    );
  }

  login(mail: Pick<User,'mail'>,
  password: Pick<User,'password'>
  ): Observable<{
    token: string;
    userId: Pick<User,'uid'>;
  }>{
    return this.http
    .post(this.url1,{ mail , password },this.httpOptions)
    .pipe(
      first(),
      tap((tokenObject: {token: string;userId: Pick<User,'uid'>})=>{
        this.userId=tokenObject.userId;
        localStorage.setItem('token',tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(['main']);


      }),
      catchError(this.errorHandlerService.handleError<{
        token: string;userId: Pick<User,'uid'>;
      }>('login'))
    );
  }

  getMotherTongue()
  {
    return this.http.get(`http://localhost:5000/auth/getMotherTongue`,this.httpOptions);
  }

  getCaste()
  {
    return this.http.get(`http://localhost:5000/auth/getCaste`,this.httpOptions);
  }

  getSubCaste(name)
  {
    return this.http.get(`http://localhost:5000/auth/getSubCaste/${name}`,this.httpOptions);
  }


  geteducation()
  {
    return this.http.get(`http://localhost:5000/auth/geteducation`,this.httpOptions);
  }

  getoccupation()
  {
    return this.http.get(`http://localhost:5000/auth/getoccupation`,this.httpOptions);
  }

  getsalaryscale()
  {
    return this.http.get(`http://localhost:5000/auth/getsalaryscale`,this.httpOptions);
  }

  getheightrange()
  {
    return this.http.get(`http://localhost:5000/auth/getheightrange`,this.httpOptions);
  }

  getBasicDetails(uid)
  {
    return this.http.get(`http://localhost:5000/auth/getBasicDetails/${uid}`,this.httpOptions);
  }

  putBasicDetails(user)
  {
    return this.http.put(`http://localhost:5000/auth/putBasicDetails`,user,this.httpOptions);
  }

  getPersonalDetails(uid)
  {
    return this.http.get(`http://localhost:5000/auth/getPersonalDetails/${uid}`,this.httpOptions);
  }

  putPersonalDetails(user)
  {
    return this.http.put(`http://localhost:5000/auth/putPersonalDetails`,user,this.httpOptions);
  }

  getEduDetails(uid)
  {
    return this.http.get(`http://localhost:5000/auth/getEduDetails/${uid}`,this.httpOptions);
  }

  putEduDetails(user)
  {
    return this.http.put(`http://localhost:5000/auth/putEduDetails`,user,this.httpOptions);
  }

  getPartnerDetails(uid)
  {
    return this.http.get(`http://localhost:5000/auth/getPartnerDetails/${uid}`,this.httpOptions);
  }

  putPartnerDetails(user)
  {
    return this.http.put(`http://localhost:5000/auth/putPartnerDetails`,user,this.httpOptions);
  }

  getFamilyDetails(uid)
  {
    return this.http.get(`http://localhost:5000/auth/getFamilyDetails/${uid}`,this.httpOptions);
  }

  putFamilyDetails(user)
  {
    return this.http.put(`http://localhost:5000/auth/putFamilyDetails`,user,this.httpOptions);
  }

  getContactDetails(uid)
  {
    return this.http.get(`http://localhost:5000/auth/getContactDetails/${uid}`,this.httpOptions);
  }

  putContactDetails(user)
  {
    return this.http.put(`http://localhost:5000/auth/putContactDetails`,user,this.httpOptions);
  }

  getOtherDetails(uid)
  {
    return this.http.get(`http://localhost:5000/auth/getOtherDetails/${uid}`,this.httpOptions);
  }

  putOtherDetails(user)
  {
    return this.http.put(`http://localhost:5000/auth/putOtherDetails`,user,this.httpOptions);
  }


  fetchAllMale()
  {
    return this.http.get(`http://localhost:5000/auth/fetchAllMale`,this.httpOptions);
  }
  fetchAllFemale()
  {
    return this.http.get(`http://localhost:5000/auth/fetchAllFemale`,this.httpOptions);
  }


}
