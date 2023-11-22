import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainScreenComponent } from './main-screen/main-screen.component';
import { DetailsScreenComponent } from './details-screen/details-screen.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
 // { path: 'details/:city/:day', component: DetailsScreenComponent },
 { path: 'details/:day', component: DetailsScreenComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
