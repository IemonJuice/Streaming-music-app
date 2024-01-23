import {Routes} from "@angular/router";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: '', loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule)},
  {path: 'home', loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule)},
  {path: 'catalog', loadChildren: () => import('../features/catalog/catalog.module').then(m => m.CatalogModule)},
  {path: 'upload', loadChildren: () => import('../features/upload/upload.module').then(m => m.UploadModule)},
  {path: 'profile',canActivate:[authGuard], loadChildren: () => import('../features/profile/profile.module').then(m => m.ProfileModule)},
  {path: 'auth', loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule)},
  {path: 'music', loadChildren: () => import('../features/music-player/music-player.module').then(m => m.MusicPlayerModule)},
  {path: 'not-found', loadChildren: () => import('../features/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
]
