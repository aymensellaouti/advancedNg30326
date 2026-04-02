import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConnectedUser } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-fils-cd',
  templateUrl: './fils-cd.component.html',
  styleUrls: ['./fils-cd.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilsCDComponent {
  @Input({required: true})
  user!: ConnectedUser;

  @Input()
  name = '';
}
