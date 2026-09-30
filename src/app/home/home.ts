import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly services = [
    {
      key: 'ca',
      title: 'CA Connect',
      icon: 'bi bi-file-earmark-text-fill',
      iconClass: 'icon-ca',
      action: 'Request Callback',
      description: 'Full-spectrum accounting, tax filing, and statutory compliance executed directly by accredited Chartered Accountants.',
      items: ['GST registration and monthly return filings', 'Income tax audits and statutory returns', 'Balance sheet certification and ROC filings', 'Company and MSME incorporation support'],
    },
    {
      key: 'heavy',
      title: 'Heavy Machinery',
      icon: 'bi bi-tools',
      iconClass: 'icon-heavy',
      action: 'Request Dispatch',
      description: 'On-demand heavy earth-moving machinery dispatch, field repairs, overhaul workshops, and genuine spare parts.',
      items: ['Excavator, JCB and backhoe fleet rental', 'On-site mobile mechanic breakdown support', 'Engine, transmission and hydraulic overhauls', 'Fast delivery of OEM and spare parts'],
    },
    {
      key: 'astrology',
      title: 'Astrology Connect',
      icon: 'bi bi-moon-stars-fill',
      iconClass: 'icon-astro',
      action: 'Book Consultation',
      description: 'Personalized astrological guidance, Kundali reviews, event timing, and Vastu consultations.',
      items: ['Kundali chart analysis and matchmaking', 'Career, business and financial timing', 'Residential and commercial Vastu planning', 'Tele-consultation or direct appointments'],
    },
  ];
  selectedService = '';
  submitted = false;

  selectService(service: string): void {
    this.selectedService = service;
    document.getElementById('call-back')?.scrollIntoView({ behavior: 'smooth' });
  }

  submitForm(): void {
    this.submitted = true;
  }
}