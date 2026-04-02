import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";
import { ListComponent } from "../list/list.component";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-autocomplete",
    templateUrl: "./autocomplete.component.html",
    styleUrls: ["./autocomplete.component.css"],
    imports: [FormsModule, ReactiveFormsModule, ListComponent, AsyncPipe]
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  form = this.formBuilder.group({ search: [""] });
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  cvs$: Observable<Cv[]> = this.search.valueChanges.pipe(
    //tap(chaine => console.log('before debounce '+ chaine)),
    debounceTime(500),
    //tap(chaine => console.log('after debounce '+ chaine)),
    filter(chaine => chaine.length >= 3),
    switchMap(name => this.cvService.selectByName(name)),
    distinctUntilChanged()
  )
  constructor() {

  }
}
