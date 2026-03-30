import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css'],
})
export class MasterDetailsComponent {
  cvs: Cv[] = [];
  router = inject(Router);
  acr = inject(ActivatedRoute);
  constructor(
    private toastr: ToastrService,
    private cvService: CvService,
  ) {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
    this.toastr.info('Bienvenu dans notre CvTech');
  }
  onForwardCv(cv: Cv) {
    this.router.navigate([cv.id], {relativeTo: this.acr })
    // Navigation à la nouvelle route
  }
}
