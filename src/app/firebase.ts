import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { Analytics, isSupported, getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBiqGEGNfCTtaQBaUuNDFniSBvQHeXXuek',
  authDomain: 'xpertend62.firebaseapp.com',
  projectId: 'xpertend62',
  storageBucket: 'xpertend62.firebasestorage.app',
  messagingSenderId: '407179135171',
  appId: '1:407179135171:web:54e581735b95643b28fa76',
  measurementId: 'G-5R2MVQ7RT8',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = initializeFirestore(firebaseApp, {
  experimentalAutoDetectLongPolling: true,
});

// Analytics is browser-only and unsupported in some environments, so init is deferred and optional.
export let analytics: Analytics | undefined;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebaseApp);
    }
  })
  .catch(() => undefined);
