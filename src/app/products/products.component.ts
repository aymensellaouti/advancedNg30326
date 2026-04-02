import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  tap,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    standalone: false
})
export class ProductsComponent {
  #setting: Settings = {limit: 12,skip: 0};
  productService = inject(ProductService);
  total = 100;
  #settings$ = new BehaviorSubject(this.#setting);
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  products$: Observable<Product[]> = this.#settings$.pipe(
    concatMap(setting => this.productService.getProducts(setting)),
    //tap(resultat => this.total = resultat.total),
    map(result => result.products),
    scan((oldProducts, newProducts) => [...oldProducts, ...newProducts]),
    takeWhile(products => this.total > products.length)
  );
  more() {
    this.#setting.skip += this.#setting.limit;
    this.#settings$.next(this.#setting);
  }
}
