import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { accountFeature } from './account-info.redux-feature';
import { loadAccountInformation } from './actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  account$ = this.store.select(accountFeature.selectPersonalInfo);
  constructor(private store: Store) {
    store.dispatch(loadAccountInformation());
  }

  ngOnInit(): void {}
}
