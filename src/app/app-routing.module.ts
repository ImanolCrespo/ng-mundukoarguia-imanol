import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityNewComponent } from './activity-new/activity-new.component';

const routes: Routes = [
    {path: '',                    component: HomeComponent},
    {path: 'activities/:id/new', component: ActivityNewComponent},
    {path: 'activities/:activityId', component: ActivityDetailComponent},
    {path: 'activities/:id/edit', component: ActivityEditComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
