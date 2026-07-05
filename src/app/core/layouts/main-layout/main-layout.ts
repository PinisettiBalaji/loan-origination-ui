import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    Header,
    Sidebar,
    Footer,
    RouterOutlet,
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayout {}
