import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking-page',
  standalone: true,
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css'],
})
export class TrackingPageComponent {
  protected readonly orderId: string;

  constructor(route: ActivatedRoute) {
    this.orderId = route.snapshot.queryParamMap.get('order') || 'SSL-2048';
  }
}
