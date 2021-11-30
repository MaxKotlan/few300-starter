import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountState } from './account-info.redux-feature';
import { accountInformationLoaded, loadAccountInformation } from './actions';

@Injectable()
export class AccountEffects {
  loadAccountInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAccountInformation),
      switchMap(() =>
        this.client
          .get<AccountState>(environment.urls.hypertheoryLearning + 'my-account')
          .pipe(map((payload) => accountInformationLoaded({ payload }))),
      ),
    );
  });

  constructor(private actions$: Actions, private client: HttpClient) {}
}
