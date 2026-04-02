import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICanLeave } from 'src/app/guards/can-leave.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { APP_ROUTES } from 'src/config/routes.config';
import { CONSTANTES } from 'src/config/const.config';
import { uniqueCinValidator } from 'src/app/validators/unique-cin.async-validator';

@Component({
    selector: 'app-add-cv',
    templateUrl: './add-cv.component.html',
    styleUrls: ['./add-cv.component.css'],
    standalone: false
})
export class AddCvComponent implements ICanLeave, OnDestroy {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toaster: ToastrService,
  ) {
    this.age.valueChanges
    .pipe(
    //  debounceTime(300),
      takeUntilDestroyed()
    )
    .subscribe({
      next: (age) => {
        if(age > 17) {
          this.path?.enable();
        } else {
          this.path?.disable();
        }
      }
    });

    const addCvForm = localStorage.getItem(CONSTANTES.addCvForm);
    if (addCvForm) {
      this.form.patchValue(JSON.parse(addCvForm));
    }
  }
  ngOnDestroy(): void {
    if (this.form.valid) {
      localStorage.setItem(CONSTANTES.addCvForm, JSON.stringify(this.form.value))
    }
  }
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
          validators: [Validators.required],
          asyncValidators: [uniqueCinValidator(this.cvService)],
          updateOn: 'blur'
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
          updateOn: 'blur'
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
    this.cvService.addCv(this.form.getRawValue()).subscribe({
      next: () => {
        this.toaster.success(`Le cv a été ajouté avec succès`);
        this.form.reset();
        localStorage.removeItem(CONSTANTES.addCvForm);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: (erreur) => {
        console.log(erreur);
        this.toaster.error(
          `Problème avec le serveur veuillez contacter l'admin`,
        );
      },
    });
  }
  canLeave(): boolean {
    return this.form.pristine;
  }

  canLeaveMessage(): string {
    return 'Vous avez commencé la création de votre Cv etes vous sur de vouloir quitter la page';
  }
  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job() {
    return this.form.get('job');
  }
  get path() {
    return this.form.get('path');
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}
