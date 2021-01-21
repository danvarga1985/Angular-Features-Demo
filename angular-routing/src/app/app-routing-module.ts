import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolver} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  // ':id' refers to a dynamic part of the path
  // 'canActivate' ensures that the path is only accessible if AuthGuard's 'canActivate' and/or 'canActivateChild' function returns true
  {
    path: 'servers',
    // canActivate includes canActivateChild, so here it's redundant
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent, children: [
      // Nested/child paths - will be displayed at the same page as the parent-component (router-outlet has to be placed in the parent HTML)
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]
  },
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'}},
  // '**' wildcard: every nonexistent path will refer to this - needs to be the last to be evaluated in order for the other paths to work
  // 'redirectTo' refers to a path, not a component - need to watch out for 'matching strategy'!!!!
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [
/*
    Hash-mode vs. HTML history-mode
    useHash:true - inserts a hash symbol after the url-root, effectively changes it to the servers address. Important in production!
    Everything after # will be ignored by the server, and will be parsed by the client (namely Angular).
*/
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  // Make the module accessible for the Router, injected in components
  exports: [RouterModule]
})
export class AppRoutingModule {

}
