import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    public routesList: Array<{ route: string; label: string }>;

    constructor() {
        this.routesList = [
            {
                route: 'movies',
                label: 'MOVIES',
            },
        ];
    }

    ngOnInit(): void {}
}
