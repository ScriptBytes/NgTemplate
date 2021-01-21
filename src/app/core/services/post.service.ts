import { Injectable } from '@angular/core';
import { SbHttpService } from './sb-http.service';
import { SbStoreService } from './sb-store.service';

@Injectable({providedIn: 'root'})
export class PostService extends SbStoreService<any> {
  constructor(
    protected sbHttp: SbHttpService<any>
  ) {
    super(
      sbHttp,
      {
        url: 'https://jsonplaceholder.typicode.com/posts/',
        idField: 'id',
        itemName: 'Post'
      }
    );
  }
}
