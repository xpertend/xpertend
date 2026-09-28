import { Component } from '@angular/core';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-astrology-xpertend',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './astrology-xpertend.html',
  styleUrl: './astrology-xpertend.css',
})
export class AstrologyXpertend {}
