import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
    selector: 'shared-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private data: DataService, private router: Router) {}
    sendValue(event) {
      if (event.target.value !== '') {
        this.data.searchFunc(event.target.value);
        this.router.navigate(['/search'])
      }
      else console.log("search is empty")
    }

}
