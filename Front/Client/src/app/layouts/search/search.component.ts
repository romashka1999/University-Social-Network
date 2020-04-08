import { Component, OnInit} from '@angular/core';
import {UserSearch} from '../../shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchMatchs: UserSearch[] = []
  followedArr = []
  constructor(private http: HttpClient, private data: DataService) { }

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
    this.checkIfFollowed(id)
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
  checkIfFollowed(id: number) {
     this.http.get<any>(`http://localhost:3000/public/users/checkfollowing/${id}`)
      .subscribe((res) => {
        // console.log(this.followedArr);
        this.followedArr[id] = (res.data);
        console.log(res.data)
        return (res.data);
      })
  }

}
