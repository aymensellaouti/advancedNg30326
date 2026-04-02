import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { canLeaveGuard } from "../guards/can-leave.guard";
import { AddCvComponent } from "./add-cv/add-cv.component";
import { CvComponent } from "./cv/cv.component";
import { cvsResolver } from "./cvs-resolver.resolver";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { MasterDetailsComponent } from "./master-details/master-details.component";


export const CV_ROUTES = [
      {
        path: '',
        component: CvComponent,
        resolve: {
          cvs: cvsResolver,
        },
      },
      {
        path: 'add',
        component: AddCvComponent,
        canActivate: [AuthGuard],
        canDeactivate: [canLeaveGuard],
      },
      {
        path: 'list',
        component: MasterDetailsComponent,
        children: [{ path: ':id', component: DetailsCvComponent }],
      },
      { path: ':id', component: DetailsCvComponent },
];
@NgModule({
  imports: [RouterModule.forChild(CV_ROUTES)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
