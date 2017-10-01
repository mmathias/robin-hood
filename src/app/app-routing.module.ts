import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { RequestComponent } from './Request/Request.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Request', component: RequestComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
