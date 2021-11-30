import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { initializeApp } from 'src/app/mocks/initializeapp';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TopicEntryComponent } from './components/topics/topic-entry/topic-entry.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicsEffects } from './effects/topics.effects';
import { reducers } from './reducers';
import { DarkModeService } from './services/dark-mode.service';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    TopicsComponent,
    TopicEntryComponent,
    ErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    EffectsModule.forRoot([TopicsEffects]),
    ReactiveFormsModule,
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: () => initializeApp, multi: true }, DarkModeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
