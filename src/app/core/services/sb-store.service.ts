import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { StoreSettings } from '../models/store-settings.model';
import { SbHttpService } from './sb-http.service';

@Injectable({providedIn: 'root'})
export class SbStoreService<T> {
  private itemsSubject = new BehaviorSubject<T[]>(null);
  items$ = this.itemsSubject.asObservable();

  protected get items(): T[] {
    return this.itemsSubject.getValue();
  }
  protected set items(val: T[]) {
    this.itemsSubject.next([...val]);
  }

  private selectedSubject = new BehaviorSubject<T>(null);
  selected$ = this.selectedSubject.asObservable();

  protected get selected(): T {
    return this.selectedSubject.getValue();
  }
  protected set selected(val: T) {
    this.selectedSubject.next({...val});
  }

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  protected get loading(): boolean {
    return this.loadingSubject.getValue();
  }
  protected set loading(val: boolean) {
    this.loadingSubject.next(val);
  }

  private loadErrorSubject = new Subject<HttpErrorResponse>();
  loadError$ = this.loadErrorSubject.asObservable();

  protected set loadError(val: HttpErrorResponse) {
    this.loadErrorSubject.next(val);
  }

  private getErrorSubject = new Subject<HttpErrorResponse>();
  getError$ = this.getErrorSubject.asObservable();

  protected set getError(val: HttpErrorResponse) {
    this.getErrorSubject.next(val);
  }

  constructor(
    protected http: SbHttpService<T>,
    protected settings: StoreSettings
  ) { }

  load() {
    this.loading = true;

    this.http.getAll(this.settings.url)
      .pipe(
        catchError(e => {
          this.loadError = e;
          return throwError(`Error loading ${this.settings.itemName}s`)
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(d => {
        this.items = d;
      });
  }

  get(id: string) {
    this.http.get(`${this.settings.url}${id}`)
      .pipe(
        catchError(e => {
          this.getError = e;
          return throwError(`Error loading ${this.settings.itemName}`)
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(d => {
        this.selected = d;
        this.replaceOrAdd(d);
      });
  }

  private replaceOrAdd(item: T) {
    const existingIndex = this.items.findIndex(i => i[this.settings.idField] === item[this.settings.idField]);

    if (existingIndex >= 0) {
      this.items[existingIndex] = item;
      this.items = this.items;
    } else {
      this.items = [...this.items, item];
    }
  }
}
