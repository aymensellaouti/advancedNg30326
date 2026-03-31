import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css'],
})
export class MasterDetailsComponent {
  cvs: Cv[] = [];
  router = inject(Router);
  acr = inject(ActivatedRoute);
  cvs$ = this.cvService.getCvs().pipe(
    catchError(e => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
          return of(this.cvService.getFakeCvs());
    })
  )
  constructor(
    private toastr: ToastrService,
    private cvService: CvService,
  ) {
    this.toastr.info('Bienvenu dans notre CvTech');
  }
  onForwardCv(cv: Cv) {
    this.router.navigate([cv.id], {relativeTo: this.acr })
    // Navigation à la nouvelle route
  }
}
