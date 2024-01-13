import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';

const routes: Routes = [
  {
    path:'', component:PageLoginComponent
  },
  {
    path:'compra',
    canLoad:[],
    loadChildren:() =>
      import('./compra/compra.module').then((m)=>m.CompraModule)
  },
  {
    path:'vuelos',
    canLoad:[],
    loadChildren:() =>
      import('./vuelos/vuelos.module').then((m)=>m.VuelosModule)
  },
  {
    path:'usuarios',
    canLoad:[],
    loadChildren:() =>
      import('./usuarios/usuarios.module').then((m)=>m.UsuariosModule)
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

