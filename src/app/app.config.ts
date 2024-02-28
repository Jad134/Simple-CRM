import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-d7f7b","appId":"1:239044608258:web:3e339bfdcbacb4df53821b","storageBucket":"simple-crm-d7f7b.appspot.com","apiKey":"AIzaSyBhG9e67m1U42fFKNekSqMRfHNVhtpFRUU","authDomain":"simple-crm-d7f7b.firebaseapp.com","messagingSenderId":"239044608258","measurementId":"G-5ZNTL0411Q"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase()))]
};
