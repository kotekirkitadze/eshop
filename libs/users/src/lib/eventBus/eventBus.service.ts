import { Injectable } from '@angular/core';
import { filter, map, Subject, Subscription } from 'rxjs';

// interface EventData {
//   value: any;
//   name: string;
// }

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private subject$: Subject<string> = new Subject<string>();

  emit(event: any) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: any) => e.name == eventName),
        map((e: any) => e['value'])
      )
      .subscribe(action);
  }
}
