import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}