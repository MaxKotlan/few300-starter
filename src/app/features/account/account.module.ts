import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { accountFeature } from './account-info.redux-feature';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountEffects } from './account.effects';
import { AccountDisplayComponent } from './components/account-display/account-display.component';
import { OrdersDisplayComponent } from './components/orders-display/orders-display.component';
import { BooleanPipe } from './pipes/boolean.pipe';
@NgModule({
  declarations: [
    AccountComponent,
    AccountDisplayComponent,
    OrdersDisplayComponent,
    BooleanPipe,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgxSkeletonLoaderModule,
    StoreModule.forFeature(accountFeature),
    EffectsModule.forFeature([AccountEffects]),
  ],
})
export class AccountModule {}
