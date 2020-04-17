import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class TabStore {

  profileSidenavState$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  profileSidenavContent$: BehaviorSubject<number> = new BehaviorSubject(null)

  postPopupState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

}
