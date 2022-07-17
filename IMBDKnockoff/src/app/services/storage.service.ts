import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    public store(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public retrieve(key: string): any {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '{ }') : null;
    }
}
