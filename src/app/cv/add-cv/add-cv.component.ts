import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICanLeave } from 'src/app/guards/can-leave.interface';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent implements ICanLeave {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toaster: ToastrService,
  ) {}
  formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      firstname: ['', Validators.required],
      path: [''],
      job: ['', Validators.required],
      cin: [
        '',
        {
          validators: [Validators.required, Validators.pattern('[0-9]{8}')],
          asyncValidators: [],
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
        },
      ],
    },
    {
      validators: [],
      asyncValidators: [],
      updateOn: 'change',
    },
  );
  addCv() {
    // this.cvService.addCv(cv).subscribe({
    //   next: () => {
    //     this.toaster.success(`Le cv a été ajouté avec succès`);
    //     this.router.navigate([APP_ROUTES.cv]);
    //   },
    //   error: (erreur) => {
    //     console.log(erreur);
    //     this.toaster.error(
    //       `Problème avec le serveur veuillez contacter l'admin`,
    //     );
    //   },
    // });
  }
  canLeave(): boolean {
    return this.form.pristine;
  }

  canLeaveMessage() :string {
    return 'Vous avez commencé la création de votre Cv etes vous sur de vouloir quitter la page'
  }
}
