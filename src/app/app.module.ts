import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { RepositoryComponent } from './repository/repository.component';
import { UserComponent } from './user/user.component';

import { DatePtbrPipe } from '../pipes/dateptbr.pipe';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProfileComponent,
    RepositoryComponent,
    UserComponent,
    DatePtbrPipe,
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoadingBarHttpClientModule,
  ],
  providers   : [],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
