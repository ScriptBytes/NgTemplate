import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SbHttpService<T> {
  constructor(
    private http: HttpClient
  ) { }

  getAll(url: string) {
    return this.http.get<T[]>(url)
      .pipe(
        retry(2),
        take(1)
      )
  }

  get(url: string) {
    return this.http.get<T>(url)
      .pipe(
        retry(2),
        take(1)
      )
  }
}
