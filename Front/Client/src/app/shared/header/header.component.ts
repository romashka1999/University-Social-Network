import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'shared-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private data: DataService) {}
    sendValue(event) {
      if (event.target.value !== '') {
        this.data.searchFunc(event);
      }
      else console.log("search is empty")
    }

}
