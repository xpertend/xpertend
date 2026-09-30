import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

type CallbackRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  createdAt: unknown;
};

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnDestroy {
  readonly username = 'xpertend';
  readonly authEmail = 'xpertend@xpertend62.firebaseapp.com';
  password = '';
  requests: CallbackRequest[] = [];
  isLoading = false;
  isSigningIn = false;
  errorMessage = '';
  currentUser: User | null = auth.currentUser;
  private unsubscribeAuth: (() => void) | undefined;
  private requestLoadVersion = 0;
  private hasAuthState = true;

  constructor(private readonly zone: NgZone, private readonly changeDetector: ChangeDetectorRef) {
    this.unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      this.zone.run(() => {
        this.applyAuthState(user);
        this.changeDetector.detectChanges();
      });
    });
  }

  private applyAuthState(user: User | null): void {
    if (this.hasAuthState && this.currentUser?.uid === user?.uid) {
      return;
    }

    this.hasAuthState = true;
    this.currentUser = user;
    this.isLoading = false;
    if (user) {
      return;
    } else {
      this.requests = [];
    }
  }

  async login(): Promise<void> {
    if (!this.password || this.isSigningIn) {
      return;
    }

    this.isSigningIn = true;
    this.errorMessage = '';
    try {
      const credentials = await Promise.race([
        signInWithEmailAndPassword(auth, this.authEmail, this.password),
        new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error('Firebase sign-in timed out')), 10000)),
      ]);
      this.zone.run(() => {
        this.currentUser = credentials.user;
        this.hasAuthState = true;
        this.password = '';
        this.isLoading = true;
        this.changeDetector.detectChanges();
        void this.loadRequests();
      });
    } catch (error) {
      console.error('Unable to sign in to the admin desk', error);
      this.zone.run(() => {
        this.errorMessage = 'Sign-in failed. Check the username and password.';
        this.changeDetector.detectChanges();
      });
    } finally {
      this.zone.run(() => {
        this.isSigningIn = false;
        this.changeDetector.detectChanges();
      });
    }
  }

  async loadRequests(): Promise<void> {
    const loadVersion = ++this.requestLoadVersion;
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const requestsQuery = query(collection(firestore, 'mail'));
      const snapshot = await Promise.race([
        getDocs(requestsQuery),
        new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error('Firestore request timed out')), 8000)),
      ]);
      if (loadVersion !== this.requestLoadVersion || !auth.currentUser) {
        return;
      }
      const requests = snapshot.docs.map((document) => {
        const data = document.data();
        const formData = (data['formData'] ?? {}) as Record<string, unknown>;
        return {
          id: document.id,
          name: String(formData['name'] ?? 'Unknown'),
          phone: String(formData['phone'] ?? 'Not provided'),
          email: String(formData['email'] ?? 'Not provided'),
          service: String(formData['service'] ?? 'Not specified'),
          location: String(formData['location'] ?? 'Not provided'),
          createdAt: data['createdAt'],
        };
      }).sort((first, second) => this.timestampValue(second.createdAt) - this.timestampValue(first.createdAt));
      this.zone.run(() => {
        if (loadVersion === this.requestLoadVersion && auth.currentUser) {
          this.requests = requests;
        }
        this.changeDetector.detectChanges();
      });
    } catch (error) {
      console.error('Unable to load callback requests', error);
      this.zone.run(() => {
        this.errorMessage = 'Requests could not be loaded. Check your connection and Firestore rules, then try again.';
        this.changeDetector.detectChanges();
      });
    } finally {
      this.zone.run(() => {
        if (loadVersion === this.requestLoadVersion) {
          this.isLoading = false;
        }
        this.changeDetector.detectChanges();
      });
    }
  }

  private timestampValue(value: unknown): number {
    if (value && typeof value === 'object' && 'toMillis' in value && typeof value.toMillis === 'function') {
      return value.toMillis();
    }
    return 0;
  }

  async logout(): Promise<void> {
    ++this.requestLoadVersion;
    this.requests = [];
    this.currentUser = null;
    this.isLoading = false;
    this.changeDetector.detectChanges();
    await signOut(auth);
  }

  ngOnDestroy(): void {
    this.unsubscribeAuth?.();
  }
}
