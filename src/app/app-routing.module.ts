import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'view-motorista', loadChildren: './view-motorista/view-motorista.module#ViewMotoristaPageModule' },
  { path: 'cadastro-user', loadChildren: './cadastro-user/cadastro-user.module#CadastroUserPageModule' },
  { path: 'view-admin', loadChildren: './view-admin/view-admin.module#ViewAdminPageModule' },
  { path: 'view-user', loadChildren: './view-user/view-user.module#ViewUserPageModule' },
  { path: 'list-rua', loadChildren: './list-rua/list-rua.module#ListRuaPageModule' },
  { path: 'view-list-cronograma', loadChildren: './view-list-cronograma/view-list-cronograma.module#ViewListCronogramaPageModule' },
  { path: 'form-user', loadChildren: './form-user/form-user.module#FormUserPageModule' },
  { path: 'change-street', loadChildren: './change-street/change-street.module#ChangeStreetPageModule' },
  { path: 'next-coleta', loadChildren: './next-coleta/next-coleta.module#NextColetaPageModule' },
  { path: 'generate-date', loadChildren: './generate-date/generate-date.module#GenerateDatePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
