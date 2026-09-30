import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
})
export class App implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Hash routing doesn't trigger GA's automatic history-based page_view, so log it manually.
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        void this.trackPageView(event.urlAfterRedirects);
      });
  }

  // Dynamically imported so the Firebase SDK stays out of the eager initial bundle.
  private async trackPageView(path: string): Promise<void> {
    const [{ analytics }, { logEvent }] = await Promise.all([import('./firebase'), import('firebase/analytics')]);
    if (analytics) {
      logEvent(analytics, 'page_view', { page_path: path });
    }
  }
}
