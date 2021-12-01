import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/actions/auth.actions';
import { selectLoggedIn } from 'src/app/reducers';

@Component({
  selector: 'app-nav-bar', // <app-nav-bar>///
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isLoggedIn$ = this.store.select(selectLoggedIn);
  constructor(private store: Store, private router: Router) {}

  logOut() {
    this.store.dispatch(logOut());
    this.router.navigate(['home']);
  }
}
