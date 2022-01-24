import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private httpClient:HttpClient ) { }
  private apiUrl:string = 'https://jsonplaceholder.typicode.com/todos';

  getPosts():any{
    return this.httpClient.get(this.apiUrl);
  }
}
