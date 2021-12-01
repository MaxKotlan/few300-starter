import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MustBeLoggedInGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { TopicsComponent } from './components/topics/topics.component';

// http://app.hypertheory.com/[home|topics|account]
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'topics',
    component: TopicsComponent,
  },
  {
    path: 'account',
    canActivate: [MustBeLoggedInGuard],
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
