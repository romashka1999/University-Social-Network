import { Component, OnInit} from '@angular/core';
import {UserSearch} from '../../shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {forkJoin, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchMatchs: UserSearch[] = []
  constructor(private http: HttpClient, private data: DataService, private router: Router) { }

  public ngOnInit() {
      this.data.currentInput.subscribe(searchInput => {
        if (this.data.searchSource.value !== null) {
          this.http.get<any>(`http://localhost:3000/public/users/serachUsers?search=${searchInput}&page=0&pageSize=10`)
            .subscribe(searchMatchs => {
              console.log(searchMatchs);
              this.searchMatchs = searchMatchs.data;
            })
        }
      })
  }
  followUser(id: number) {
    this.http.get(`http://localhost:3000/public/users/followUser/${id}`)
      .subscribe((res) => {
        console.log(res)
      })
  }
  unfollowUser(id: number) {
    this.http.get(`http://localhost:3000/public/users/unfollowUser/${id}`)
      .subscribe((res) => {
        console.log(res)
      })
  }
  goToProfile(id: number) {
    this.router.navigate(['/profile', id])
    // this.data.getProfile(id)
    //   .subscribe((res) => {
    //     console.log(res)
    //   })
  }
}
