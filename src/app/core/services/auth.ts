import { Service, signal, inject, computed } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
import {
    map,
    tap,
    catchError
} from 'rxjs/operators';
import {
    BehaviorSubject,
    Observable,
    throwError
} from 'rxjs';

import { User } from '../../features/auth/models/user';
import { HttpClient } from '@angular/common/http';

@Service()
export class Auth {

    private readonly http = inject(HttpClient);

    private readonly USERS_API = 'mock/users.json';


    private currentUserSubject =
        new BehaviorSubject<User | null>(null);

    readonly currentUser$ =
        this.currentUserSubject.asObservable();

    readonly isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

    readonly currentUser = signal<User | null>(null);


    readonly isLoggedIn = computed(() => this.currentUser() !== null);

    login(email: string, password: string): Observable<User> {
        return this.http.get<User[]>(this.USERS_API).pipe(
            map(users => {
                const user = users.find(u =>
                    u.email === email &&
                    u.password === password
                );
                if (!user) {
                    throw new Error('Invalid email or password');
                }
                return user;
            }),
            tap(user => {
                // Update RxJS state
                this.currentUserSubject.next(user);
                // Update Signal
                this.currentUser.set(user);
            }),
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    logout(): void {

        this.currentUserSubject.next(null);

        this.currentUser.set(null);

    }


}