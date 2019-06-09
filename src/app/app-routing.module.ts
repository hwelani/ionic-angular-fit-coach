import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignupPageModule'
  },
  {
    path: 'password-reset',
    loadChildren:
      './pages/password-reset/password-reset.module#PasswordResetPageModule'
  },
  {
    path: 'client-create',
    loadChildren:
      './pages/client-create/client-create.module#ClientCreatePageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'client-list',
    loadChildren: './pages/client-list/client-list.module#ClientListPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'client-detail/:id',
    loadChildren:
      './pages/client-detail/client-detail.module#ClientDetailPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
