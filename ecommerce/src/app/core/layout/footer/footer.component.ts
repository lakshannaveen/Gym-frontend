// footer.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Social media links - replace with your actual URLs
  socialLinks = {
    facebook: 'https://facebook.com/skysatlanka',
    instagram: 'https://instagram.com/skysatlanka',
    youtube: 'https://youtube.com/skysatlanka',
    whatsapp: 'https://wa.me/94774235919',
    twitter: 'https://twitter.com/skysatlanka'
  };
currentYear: any;

  // You can also add backend URL if needed
  // backendUrl = 'https://api.skysatlanka.com';
}