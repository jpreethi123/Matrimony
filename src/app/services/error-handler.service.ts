
import { Injectable } from '@angular/core';
import { of ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }
  handleError<T>(operation='operation',result?: T){
    return (error: any): Observable <T>=>{
      console.log(`${operation} failed:${error.message}`);
      return of(result as T);
    };
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering

}
