import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {UserSearch} from '../../models/user.model';

@Component({
    selector: 'shared-header',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SharedSearchComponent implements OnInit {
  public searchMatch: UserSearch[] = [];
  constructor(
              private data: DataService,
              private router: Router) {}

   ngOnInit() {
  }

  goToProfile(id: number) {
    this.data.searchResult.next(id);
  }

  searchUser(value: string) {
     this.data.searchUser(value)
      .subscribe((searchMatch) => {
        console.log(searchMatch);
        this.searchMatch = searchMatch.data;
      });
  }
}
