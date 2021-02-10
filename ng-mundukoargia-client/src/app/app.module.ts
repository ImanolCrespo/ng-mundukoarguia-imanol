import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import for loading & configuring in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductItemComponent } from './activity-item/activity-item.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityService } from './shared/activity.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityData } from './shared/activity-data';
import { HttpClientModule } from '@angular/common/http';
import { ActivityNewComponent } from './activity-new/activity-new.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    ProductItemComponent,
    ActivityDetailComponent,
    ActivityEditComponent,
    ActivityNewComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    //InMemoryWebApiModule.forRoot(ActivityData)
  ],
  providers: [ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
