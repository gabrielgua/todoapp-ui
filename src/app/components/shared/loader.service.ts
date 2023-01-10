import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  requestStarted(): void {
    this.isLoading.next(true);
  }

  requestEnded(): void {
    this.isLoading.next(false);
  }
}
