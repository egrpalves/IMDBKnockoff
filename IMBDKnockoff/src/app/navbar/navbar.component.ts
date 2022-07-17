import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    routesList: Array<{ route: string; label: string }>;
    currentLang: string = '';

    constructor(public translate: TranslateService) {
        this.routesList = [
            {
                route: 'movies',
                label: 'MOVIES',
            },
        ];
        this.currentLang = localStorage.getItem('lang') || 'en';
    }

    ngOnInit(): void {}

    changeLang(value: string): void {
        this.translate.use(value);
        localStorage.setItem('lang', value);
    }
}
