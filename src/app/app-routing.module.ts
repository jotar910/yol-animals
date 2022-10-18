import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from './shared/enums/route.enums';

const routes: Routes = [
  {
    path: RouteEnums.ANIMALS,
    loadChildren: () => import('./animals/animals.module').then((m) => m.AnimalsModule)
  },
  {
    path: '**',
    redirectTo: RouteEnums.ANIMALS
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
