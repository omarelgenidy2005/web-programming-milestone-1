import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MonitoringService } from './services/monitoring.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('uas-frontend');

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit() {
    this.monitoringService.init();
  }
}
