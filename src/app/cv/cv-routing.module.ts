import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { canLeaveGuard } from "../guards/can-leave.guard";

import { CvComponent } from "./cv/cv.component";
import { cvsResolver } from "./cvs-resolver.resolver";




export const CV_ROUTES = [
      {
        path: '',
        loadComponent: () => import('./cv/cv.component').then(m => m.CvComponent),
        resolve: {
          cvs: cvsResolver,
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./add-cv/add-cv.component').then(m => m.AddCvComponent),
        canActivate: [AuthGuard],
        canDeactivate: [canLeaveGuard],
      },
      {
        path: 'list',
        loadComponent: () => import('./master-details/master-details.component').then(m => m.MasterDetailsComponent),
        children: [{ path: ':id', loadComponent: () => import('./details-cv/details-cv.component').then(m => m.DetailsCvComponent) }],
      },
      { path: ':id', loadComponent: () => import('./details-cv/details-cv.component').then(m => m.DetailsCvComponent) },
];
@NgModule({
  imports: [RouterModule.forChild(CV_ROUTES)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
