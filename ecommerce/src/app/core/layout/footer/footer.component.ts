import { Component } from '@angular/core';
import { BACKEND_URL } from '../../../shared/config/backend-url';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  protected readonly backendUrl = BACKEND_URL;
}