import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserSearch} from '../../shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchMatchs: UserSearch[] = []
  public someData: Subscription;
  constructor(private http: HttpClient, private data: DataService, private router: Router) { }

  public ngOnInit() {
     this.someData =  this.data.currentInput.subscribe(searchInput => {
        if (this.data.searchSource.value !== null) {
         this.http.get<any>(`http://localhost:3000/public/users/serachUsers?search=${searchInput}&page=0&pageSize=10`)
            .subscribe(searchMatchs => {
              console.log(searchMatchs);
              this.searchMatchs = searchMatchs.data;
            })
        }
      })
  }
    ngOnDestroy() {
    this.someData.unsubscribe();
    }

  goToProfile(id: number) {
    this.router.navigate(['/profile', id])
    // this.data.getProfile(id)
    //   .subscribe((res) => {
    //     console.log(res)
    //   })
  }
}
