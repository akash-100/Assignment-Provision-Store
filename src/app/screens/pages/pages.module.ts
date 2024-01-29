import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'product-list', component: ProductListComponent },
      { path: 'about', component: AboutComponent }
    ]
  }
]

@NgModule({
  declarations: [
    PagesComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class PagesModule { }
