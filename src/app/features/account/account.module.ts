import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { accountFeature } from './account-info.redux-feature';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountEffects } from './account.effects';
import { AccountDisplayComponent } from './components/account-display/account-display.component';
import { OrdersDisplayComponent } from './components/orders-display/orders-display.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountDisplayComponent,
    OrdersDisplayComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    StoreModule.forFeature(accountFeature),
    EffectsModule.forFeature([AccountEffects]),
  ],
})
export class AccountModule {}
