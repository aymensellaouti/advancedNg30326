import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent {
  firstObservable$: Observable<number>;
  //counter = 5;
  constructor(private toaster: ToastrService) {
    this.firstObservable$ = new Observable((observer) => {
      let i = 5;
      setInterval(() => {
        if (!i) {
          observer.complete();
        }
        observer.next(i--);
      }, 1000);
    });
    this.firstObservable$.subscribe({
      next: value => {console.log(value);}
    });
//    setTimeout(() => {
       this.firstObservable$
       .pipe(
        // 5 4 3 2 1
        map(valeur => valeur * 3)
        // 15 12 9 6 3
       )
       .subscribe({
         next: (value) => {
           this.toaster.info('' + value);
         },
         complete: () => this.toaster.error('BOOOOM !!!!'),
       });
  //  }, 3000)
      //  this.firstObservable$.subscribe({
      //   next: value => this.counter = value
      //  })
  }
}
