import { Component } from '@angular/core';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-heavy-xpertend',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './heavy.html',
  styleUrl: './heavy.css',
})
export class HeavyXpertend {}
