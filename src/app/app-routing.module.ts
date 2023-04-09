import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { } from './modules/home/home.module'
import {NotAutComponent} from './shared/components/not-aut/not-aut.component';

const routes: Routes = [
  { path: '', loadChildren: './modules/home/home.module#HomeModule' },
  {path: '403', component: NotAutComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
