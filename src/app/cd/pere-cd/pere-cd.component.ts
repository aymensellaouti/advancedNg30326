import { Component } from '@angular/core';
import { ConnectedUser } from 'src/app/auth/services/auth.service';
import { FilsCDComponent } from "../fils-cd/fils-cd.component";

@Component({
  selector: 'app-pere-cd',
  templateUrl: './pere-cd.component.html',
  styleUrls: ['./pere-cd.component.css'],
})
export class PereCDComponent {
  user: ConnectedUser = {
    id: 1,
    email: 'aymen@gmail.com'
  }
  name = 'jesser';

  changeUser(email: string) {
    this.user = {...this.user, email};
  }
}
