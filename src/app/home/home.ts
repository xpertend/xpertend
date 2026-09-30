import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase';

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
      description:
        'Full-spectrum accounting, tax filing, and statutory compliance executed directly by accredited Chartered Accountants.',
      items: [
        'GST registration and monthly return filings',
        'Income tax audits and statutory returns',
        'Balance sheet certification and ROC filings',
        'Company and MSME incorporation support',
      ],
    },
    {
      key: 'heavy',
      title: 'Heavy Machinery',
      icon: 'bi bi-tools',
      iconClass: 'icon-heavy',
      action: 'Request Dispatch',
      description:
        'On-demand heavy earth-moving machinery dispatch, field repairs, overhaul workshops, and genuine spare parts.',
      items: [
        'Excavator, JCB and backhoe fleet rental',
        'On-site mobile mechanic breakdown support',
        'Engine, transmission and hydraulic overhauls',
        'Fast delivery of OEM and spare parts',
      ],
    },
    {
      key: 'astrology',
      title: 'Astrology Connect',
      icon: 'bi bi-moon-stars-fill',
      iconClass: 'icon-astro',
      action: 'Book Consultation',
      description:
        'Personalized astrological guidance, Kundali reviews, event timing, and Vastu consultations.',
      items: [
        'Kundali chart analysis and matchmaking',
        'Career, business and financial timing',
        'Residential and commercial Vastu planning',
        'Tele-consultation or direct appointments',
      ],
    },
  ];
  selectedService = '';
  submitted = false;
  isSubmitting = false;
  submitError = '';
  linkCopied = false;

  private readonly shareUrl = 'https://xpertend.com/';
  private readonly shareText =
    'Xpertend — direct coordination desk for CA, Heavy Machinery & Astrology services.';

  get whatsappShareUrl(): string {
    return `https://wa.me/?text=${encodeURIComponent(`${this.shareText} ${this.shareUrl}`)}`;
  }

  get facebookShareUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl)}`;
  }

  get twitterShareUrl(): string {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.shareUrl)}&text=${encodeURIComponent(this.shareText)}`;
  }

  get linkedInShareUrl(): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl)}`;
  }

  get telegramShareUrl(): string {
    return `https://t.me/share/url?url=${encodeURIComponent(this.shareUrl)}&text=${encodeURIComponent(this.shareText)}`;
  }

  // Instagram has no web share intent, so prefer the native OS share sheet (which lists Instagram on mobile).
  async shareToInstagram(): Promise<void> {
    if ('share' in navigator) {
      await this.shareNative();
      return;
    }
    await this.copyLink();
    window.open('https://www.instagram.com/', '_blank', 'noopener');
  }

  async shareNative(): Promise<void> {
    try {
      await navigator.share({ title: 'Xpertend', text: this.shareText, url: this.shareUrl });
    } catch {
      // User dismissed the share sheet; nothing to do.
    }
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.shareUrl);
      this.linkCopied = true;
      window.setTimeout(() => (this.linkCopied = false), 2000);
    } catch (error) {
      console.error('Unable to copy link', error);
    }
  }

  selectService(service: string): void {
    this.selectedService = service;
    document.getElementById('call-back')?.scrollIntoView({ behavior: 'smooth' });
  }

  async submitForm(form: NgForm): Promise<void> {
    if (form.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const formData = form.value as {
      name: string;
      phone: string;
      email?: string;
      service: string;
      location: string;
    };
    const serviceTitle =
      this.services.find((service) => service.key === formData.service)?.title ?? formData.service;
    const emailRows = [
      ['Name', formData.name],
      ['Phone', formData.phone],
      ['Email', formData.email || 'Not provided'],
      ['Service', serviceTitle],
      ['Location', formData.location],
    ]
      .map(
        ([label, value]) =>
          `<p><strong>${this.escapeHtml(label)}:</strong> ${this.escapeHtml(value)}</p>`,
      )
      .join('');

    try {
      await addDoc(collection(firestore, 'mail'), {
        to: ['xpertend@gmail.com'],
        message: {
          subject: `New Xpertend ${serviceTitle} callback request`,
          html: `<h2>New Xpertend callback request</h2>${emailRows}`,
        },
        formData,
        createdAt: serverTimestamp(),
      });
      this.submitted = true;
      form.resetForm();
      this.selectedService = '';
    } catch (error) {
      console.error('Unable to submit callback request', error);
      this.submitError = 'We could not send your request. Please try again or contact us directly.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private escapeHtml(value: string): string {
    return value.replace(
      /[&<>'"]/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;',
        })[character] ?? character,
    );
  }
}
