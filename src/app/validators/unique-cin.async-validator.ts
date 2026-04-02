import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { CvService } from "../cv/services/cv.service";
import { map, Observable, of } from "rxjs";

export const uniqueCinValidator = (cvService:CvService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<null|ValidationErrors> => {
    const cin = control.value;
    if (!cin) return of(null);
    return cvService.selectByProperty('cin', cin).pipe(
      map(cvs => cvs.length ? {'uniqueCin': 'Le cin existe déjà'} : null)
    );
  }
}
