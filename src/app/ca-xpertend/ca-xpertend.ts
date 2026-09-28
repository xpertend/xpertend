import { Component } from '@angular/core';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-ca-xpertend',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './ca-xpertend.html',
  styleUrl: './ca-xpertend.css',
})
export class CaXpertend {}
