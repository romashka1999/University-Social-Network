import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    template: `
        <shared-sidenav></shared-sidenav>
        <div class="main-content">
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent {
    constructor() {}
}